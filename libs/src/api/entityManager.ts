import { Base, Services } from './base'
import type { PlaylistMetadata } from '../services/creatorNode'
import {
  Action,
  EntityType
} from '../services/dataContracts/EntityManagerClient'
import { Utils } from '../utils'

export type EntityManagerSuccessResponse = {
  blockHash: string
  blockNumber: number
  error: null
}
export type EntityManagerErrorResponse = {
  blockHash: null
  blockNumber: null
  error: string
}

export type EntityManagerResponse =
  | EntityManagerSuccessResponse
  | EntityManagerErrorResponse

type PlaylistTrack = { time: number; metadata_time?: number; track: number }

type PlaylistParam = {
  playlist_id: number
  playlist_name: string
  artwork?: { file?: File; url?: string }
  playlist_contents: { track_ids: PlaylistTrack[] } // number[] for playlist upload flow
  cover_art_sizes: string
  description: string
  is_private: boolean
  is_album: boolean
}

/*
  API surface for updated data contract interactions.
  Provides simplified entity management in a generic fashion
  Handles metadata + file upload etc. for entities such as Playlist/Track/User
*/
export class EntityManager extends Base {
  /**
   * Generate random integer between two known values
   */

  mapTimestamps(addedTimestamps: PlaylistTrack[]) {
    const trackIds = addedTimestamps.map((trackObj) => ({
      track: trackObj.track,
      time: trackObj.metadata_time ?? trackObj.time // default to time for legacy playlists
    }))

    return trackIds
  }

  getCurrentUserId() {
    const userId: number | null = this.userStateManager.getCurrentUserId()
    if (!userId) {
      throw new Error('Missing current user ID')
    }
    return userId
  }

  getDefaultEntityManagerResponseValues(): EntityManagerResponse {
    return {
      blockHash: null,
      blockNumber: null,
      error: ''
    }
  }

  /** Social Features */
  createSocialMethod =
    (entityType: EntityType, action: Action) =>
    async (entityId: number, metadata = ''): Promise<EntityManagerResponse> => {
      const responseValues: EntityManagerResponse =
        this.getDefaultEntityManagerResponseValues()
      try {
        return await this.manageEntity({
          userId: this.getCurrentUserId(),
          entityType,
          entityId,
          action,
          metadata
        })
      } catch (e) {
        const error = (e as Error).message
        responseValues.error = error
        return responseValues
      }
    }

  followUser = this.createSocialMethod(EntityType.USER, Action.FOLLOW)
  unfollowUser = this.createSocialMethod(EntityType.USER, Action.UNFOLLOW)
  saveTrack = this.createSocialMethod(EntityType.TRACK, Action.SAVE)
  unsaveTrack = this.createSocialMethod(EntityType.TRACK, Action.UNSAVE)
  savePlaylist = this.createSocialMethod(EntityType.PLAYLIST, Action.SAVE)
  unsavePlaylist = this.createSocialMethod(EntityType.PLAYLIST, Action.UNSAVE)
  repostTrack = this.createSocialMethod(EntityType.TRACK, Action.REPOST)
  unrepostTrack = this.createSocialMethod(EntityType.TRACK, Action.UNREPOST)
  repostPlaylist = this.createSocialMethod(EntityType.PLAYLIST, Action.REPOST)
  unrepostPlaylist = this.createSocialMethod(
    EntityType.PLAYLIST,
    Action.UNREPOST
  )

  /** Playlist */

  async createPlaylist(
    playlist: PlaylistParam
  ): Promise<EntityManagerResponse> {
    const responseValues: EntityManagerResponse =
      this.getDefaultEntityManagerResponseValues()
    try {
      const userId: number | null = this.userStateManager.getCurrentUserId()
      if (!userId) {
        responseValues.error = 'Missing current user ID'
        return responseValues
      }
      const createAction = Action.CREATE
      const entityType = EntityType.PLAYLIST
      this.REQUIRES(Services.CREATOR_NODE)
      let dirCID
      if (playlist?.artwork?.file) {
        const updatedPlaylistImage =
          await this.creatorNode.uploadTrackCoverArtV2(playlist.artwork.file)
        dirCID = updatedPlaylistImage.id
      }
      const tracks = this.mapTimestamps(playlist.playlist_contents.track_ids)

      const metadata: PlaylistMetadata = {
        playlist_id: playlist.playlist_id,
        playlist_contents: { track_ids: tracks },
        playlist_name: playlist.playlist_name,
        playlist_image_sizes_multihash: dirCID ?? playlist.cover_art_sizes, // default to cover_art_sizes for new playlists from tracks
        description: playlist.description,
        is_album: playlist.is_album,
        is_private: playlist.is_private
      }

      this.creatorNode.validatePlaylistSchema(metadata)

      const metadataCid = (
        await Utils.fileHasher.generateMetadataCidV1(metadata)
      ).toString()

      const entityManagerMetadata = JSON.stringify({
        cid: metadataCid,
        data: metadata
      })
      return await this.manageEntity({
        userId: userId,
        entityType,
        entityId: playlist.playlist_id,
        action: createAction,
        metadata: entityManagerMetadata
      })
    } catch (e) {
      const error = (e as Error).message
      responseValues.error = error
      return responseValues
    }
  }

  async deletePlaylist(playlistId: number): Promise<EntityManagerResponse> {
    const responseValues: EntityManagerResponse =
      this.getDefaultEntityManagerResponseValues()
    const userId: number | null = this.userStateManager.getCurrentUserId()
    if (!userId) {
      responseValues.error = 'Missing current user ID'
      return responseValues
    }
    try {
      return await this.manageEntity({
        userId,
        entityType: EntityType.PLAYLIST,
        entityId: playlistId,
        action: Action.DELETE,
        metadata: ''
      })
    } catch (e) {
      const error = (e as Error).message
      responseValues.error = error
      return responseValues
    }
  }

  async updatePlaylist(
    playlist: PlaylistParam
  ): Promise<EntityManagerResponse> {
    const responseValues: EntityManagerResponse =
      this.getDefaultEntityManagerResponseValues()

    try {
      const userId: number | null = this.userStateManager.getCurrentUserId()

      if (!playlist || playlist === undefined) {
        responseValues.error = 'Missing current playlist'
        return responseValues
      }
      if (!userId) {
        responseValues.error = 'Missing current user ID'
        return responseValues
      }
      const updateAction = Action.UPDATE
      const entityType = EntityType.PLAYLIST
      this.REQUIRES(Services.CREATOR_NODE)
      let dirCID
      if (playlist?.artwork?.file) {
        const updatedPlaylistImage =
          await this.creatorNode.uploadTrackCoverArtV2(playlist.artwork.file)
        dirCID = updatedPlaylistImage.id
      }

      const trackIds = this.mapTimestamps(playlist.playlist_contents.track_ids)

      const metadata: PlaylistMetadata = {
        playlist_id: playlist.playlist_id,
        playlist_contents: { track_ids: trackIds },
        playlist_name: playlist.playlist_name,
        playlist_image_sizes_multihash: dirCID ?? playlist.cover_art_sizes,
        description: playlist.description,
        is_album: playlist.is_album,
        is_private: playlist.is_private
      }
      this.creatorNode.validatePlaylistSchema(metadata)

      const metadataCid = (
        await Utils.fileHasher.generateMetadataCidV1(metadata)
      ).toString()

      const entityManagerMetadata = JSON.stringify({
        cid: metadataCid,
        data: metadata
      })
      return await this.manageEntity({
        userId,
        entityType,
        entityId: playlist.playlist_id,
        action: updateAction,
        metadata: entityManagerMetadata
      })
    } catch (e) {
      const error = (e as Error).message
      responseValues.error = error
      return responseValues
    }
  }

  /**
   * Manage an entity with the updated data contract flow
   * Leveraged to manipulate User/Track/Playlist/+ other entities
   */
  async manageEntity({
    userId,
    entityType,
    entityId,
    action,
    metadata
  }: {
    userId: number
    entityType: EntityType
    entityId: number
    action: Action
    metadata?: string
  }): Promise<EntityManagerResponse> {
    const responseValues: EntityManagerResponse =
      this.getDefaultEntityManagerResponseValues()
    try {
      if (this.contracts.EntityManagerClient === undefined) {
        throw new Error('EntityManagerClient is undefined')
      }

      const resp = await this.contracts.EntityManagerClient.manageEntity(
        userId,
        entityType,
        entityId,
        action,
        metadata ?? ''
      )
      responseValues.blockHash = resp.txReceipt.blockHash
      responseValues.blockNumber = resp.txReceipt.blockNumber
      return responseValues
    } catch (e) {
      const error = (e as Error).message
      responseValues.error = error
      return responseValues
    }
  }
}

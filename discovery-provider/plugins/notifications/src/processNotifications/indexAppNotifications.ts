import { Knex } from 'knex'

import { logger } from '../logger'
import { mapNotifications } from '../processNotifications/mappers/mapNotifications'
import { NotificationRow } from '../types/dn'
import { Follow } from './mappers/follow'
import { Repost } from './mappers/repost'
import { RepostOfRepost } from './mappers/repostOfRepost'
import { Save } from './mappers/save'
import { Remix } from './mappers/remix'
import { CosignRemix } from './mappers/cosign'
import { SupporterRankUp } from './mappers/supporterRankUp'
import { SupportingRankUp } from './mappers/supportingRankUp'
import { TierChange } from './mappers/tierChange'
import { TipReceive } from './mappers/tipReceive'
import { TipSend } from './mappers/tipSend'
import { Milestone } from './mappers/milestone'
import {
  MappingFeatureName,
  MappingVariable,
  RemoteConfig
} from '../remoteConfig'

export type NotificationProcessor =
  | Follow
  | Repost
  | Save
  | Remix
  | CosignRemix
  | Milestone
  | RepostOfRepost
  | SupporterRankUp
  | SupportingRankUp
  | TierChange
  | TipReceive
  | TipSend

const notificationTypeMapping = {
  follow: MappingVariable.PushFollow,
  repost: MappingVariable.PushRepost,
  save: MappingVariable.PushSave,
  save_of_repost: MappingVariable.PushSaveOfRepost,
  repost_of_repost: MappingVariable.PushRepostOfRepost,
  milestone: MappingVariable.PushMilestone,
  milestone_follower_count: MappingVariable.PushMilestone,
  remix: MappingVariable.PushRemix,
  cosign: MappingVariable.PushCosign,
  supporter_rank_up: MappingVariable.PushSupporterRankUp,
  supporting_rank_up: MappingVariable.PushSupportingRankUp,
  supporter_dethroned: MappingVariable.PushSupporterDethroned,
  tip_receive: MappingVariable.PushTipRceive,
  tip_send: MappingVariable.PushTipSend,
  challenge_reward: MappingVariable.PushChallengeReward,
  track_added_to_playlist: MappingVariable.PushTrackAddedToPlaylist,
  create: MappingVariable.PushCreate,
  trending: MappingVariable.PushTrending,
  trending_underground: MappingVariable.PushTrendingUnderground,
  trending_playlist: MappingVariable.PushTrendingPlaylist,
  announcement: MappingVariable.PushAnnouncement,
  reaction: MappingVariable.PushReaction
}

export class AppNotificationsProcessor {
  dnDB: Knex
  identityDB: Knex
  remoteConfig: RemoteConfig

  constructor(dnDB: Knex, identityDB: Knex, remoteConfig: RemoteConfig) {
    this.dnDB = dnDB
    this.identityDB = identityDB
    this.remoteConfig = remoteConfig
  }

  getIsPushNotificationEnabled(type: string) {
    const mappingVariable = notificationTypeMapping[type]
    // If there is no remote variable, do no push - it must be explicitly enabled
    if (!mappingVariable) return false
    const featureEnabled = this.remoteConfig.getFeatureVariableEnabled(
      MappingFeatureName,
      mappingVariable
    )
    // If the feature does not exist in remote config, then it returns null
    // In that case, set to false bc we want to explicitly set to true
    return Boolean(featureEnabled)
  }

  async process(notifications: NotificationRow[]) {
    const mappedNotifications = mapNotifications(
      notifications,
      this.dnDB,
      this.identityDB
    )
    for (const notification of mappedNotifications) {
      const isEnabled = this.getIsPushNotificationEnabled(
        notification.notification.type
      )
      if (isEnabled) {
        await notification.pushNotification()
      } else {
        logger.info(
          `Skipping push notification of type ${notification.notification.type}`
        )
      }
    }

    logger.info({ notifications })
  }
}

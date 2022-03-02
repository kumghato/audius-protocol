import React, { useCallback, useState } from 'react'

import {
  IconPlaylists,
  Modal,
  ModalContent,
  ModalHeader,
  ModalTitle
} from '@audius/stems'
import { push as pushRoute } from 'connected-react-router'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router-dom'
import { Dispatch } from 'redux'

import { ID } from 'common/models/Identifiers'
import {
  editPlaylist,
  deletePlaylist
} from 'common/store/cache/collections/actions'
import { getCollectionWithUser } from 'common/store/cache/collections/selectors'
import PlaylistForm from 'components/create-playlist/PlaylistForm'
import DeleteConfirmationModal from 'components/delete-confirmation/DeleteConfirmationModal'
import {
  getIsOpen,
  getCollectionId
} from 'store/application/ui/editPlaylistModal/selectors'
import { close } from 'store/application/ui/editPlaylistModal/slice'
import { AppState } from 'store/types'
import { FEED_PAGE, getPathname, playlistPage } from 'utils/route'
import zIndex from 'utils/zIndex'

import styles from './EditPlaylistModal.module.css'

const messages = {
  edit: 'Edit',
  delete: 'Delete',
  title: {
    playlist: 'Playlist',
    album: 'Album'
  },
  type: {
    playlist: 'Playlist',
    album: 'Album'
  }
}

type OwnProps = {}
type EditPlaylistModalProps = OwnProps &
  RouteComponentProps &
  ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>

const EditPlaylistModal = ({
  isOpen,
  collection,
  location,
  onClose,
  editPlaylist,
  deletePlaylist,
  goToRoute
}: EditPlaylistModalProps) => {
  const {
    playlist_id: playlistId,
    is_album: isAlbum,
    playlist_name: title,
    user
  } = collection || {}
  const { handle } = user || {}
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false)
  const onClickDelete = () => setShowDeleteConfirmation(true)
  const onCancelDelete = () => setShowDeleteConfirmation(false)
  const onDelete = () => {
    setShowDeleteConfirmation(false)
    onClose()
    deletePlaylist(playlistId!)
    if (handle && title) {
      const playlistRoute = playlistPage(handle, title, playlistId!)
      // If on the playlist page, direct user to feed
      if (getPathname(location) === playlistRoute) goToRoute(FEED_PAGE)
    }
  }
  const onSaveEdit = (formFields: any) => {
    editPlaylist(playlistId!, formFields)
    onClose()
  }

  const editPlaylistModalTitle = `${messages.edit} ${
    isAlbum ? messages.title.album : messages.title.playlist
  }`

  const [isArtworkPopupOpen, setIsArtworkPopupOpen] = useState(false)

  const onOpenArtworkPopup = useCallback(() => {
    setIsArtworkPopupOpen(true)
  }, [setIsArtworkPopupOpen])

  const onCloseArtworkPopup = useCallback(() => {
    setIsArtworkPopupOpen(false)
  }, [setIsArtworkPopupOpen])

  if (!collection) return null
  return (
    <>
      <Modal
        bodyClassName={styles.modalBody}
        modalKey='editplaylist'
        dismissOnClickOutside={!isArtworkPopupOpen}
        isOpen={isOpen}
        onClose={onClose}
        zIndex={zIndex.CREATE_PLAYLIST_MODAL}
      >
        <ModalHeader onClose={onClose}>
          <ModalTitle icon={<IconPlaylists />} title={editPlaylistModalTitle} />
        </ModalHeader>
        <ModalContent>
          <PlaylistForm
            isEditMode
            onCloseArtworkPopup={onCloseArtworkPopup}
            onOpenArtworkPopup={onOpenArtworkPopup}
            metadata={collection}
            isAlbum={isAlbum}
            onDelete={onClickDelete}
            onCancel={onClose}
            onSave={onSaveEdit}
          />
        </ModalContent>
      </Modal>
      <DeleteConfirmationModal
        title={`${messages.delete} ${
          isAlbum ? messages.title.album : messages.title.playlist
        }`}
        entity={isAlbum ? messages.type.album : messages.type.playlist}
        visible={showDeleteConfirmation}
        onDelete={onDelete}
        onCancel={onCancelDelete}
      />
    </>
  )
}

const mapStateToProps = (state: AppState) => {
  const collectionId = getCollectionId(state)
  return {
    isOpen: getIsOpen(state),
    collection: getCollectionWithUser(state, { id: collectionId || undefined })
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  onClose: () => dispatch(close()),
  goToRoute: (route: string) => dispatch(pushRoute(route)),
  editPlaylist: (playlistId: ID, formFields: any) =>
    dispatch(editPlaylist(playlistId, formFields)),
  deletePlaylist: (playlistId: ID) => dispatch(deletePlaylist(playlistId))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(EditPlaylistModal)
)

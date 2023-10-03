import { useCallback, useEffect } from 'react'

import {
  PurchasableTrackMetadata,
  PurchaseContentStage,
  Track,
  isTrackPurchasable,
  useGetTrackById,
  usePremiumContentPurchaseModal,
  usePurchaseContentFormConfiguration,
  buyUSDCActions,
  purchaseContentActions
} from '@audius/common'
import { IconCart, ModalContent, ModalFooter, ModalHeader } from '@audius/stems'
import cn from 'classnames'
import { Formik } from 'formik'
import { useDispatch } from 'react-redux'
import { toFormikValidationSchema } from 'zod-formik-adapter'

import { Icon } from 'components/Icon'
import { ModalForm } from 'components/modal-form/ModalForm'
import { LockedTrackDetailsTile } from 'components/track/LockedTrackDetailsTile'
import { Text } from 'components/typography'
import ModalDrawer from 'pages/audio-rewards-page/components/modals/ModalDrawer'
import { isMobile } from 'utils/clientUtil'
import { pushUniqueRoute } from 'utils/route'

import styles from './PremiumContentPurchaseModal.module.css'
import { PurchaseContentFormFields } from './components/PurchaseContentFormFields'
import { PurchaseContentFormFooter } from './components/PurchaseContentFormFooter'
import { usePurchaseContentFormState } from './hooks/usePurchaseContentFormState'

const { startRecoveryIfNecessary, cleanup: cleanupUSDCRecovery } =
  buyUSDCActions
const { cleanup } = purchaseContentActions

const messages = {
  completePurchase: 'Complete Purchase'
}

// The bulk of the form rendering is in a nested component because we want access
// to the FormikContext, which can only be used in a component which is a descendant
// of the `<Formik />` component
const RenderForm = ({
  onClose,
  track
}: {
  onClose: () => void
  track: PurchasableTrackMetadata
}) => {
  const dispatch = useDispatch()
  const {
    permalink,
    premium_conditions: {
      usdc_purchase: { price }
    }
  } = track
  const { error, isUnlocking, purchaseSummaryValues, stage } =
    usePurchaseContentFormState({ price })

  // Attempt recovery once on re-mount of the form
  useEffect(() => {
    dispatch(startRecoveryIfNecessary)
  }, [dispatch])

  const handleClose = useCallback(() => {
    dispatch(cleanupUSDCRecovery())
    onClose()
    dispatch(cleanup())
  }, [dispatch, onClose])

  // Navigate to track on successful purchase behind the modal
  useEffect(() => {
    if (stage === PurchaseContentStage.FINISH && permalink) {
      dispatch(pushUniqueRoute(permalink))
    }
  }, [stage, permalink, dispatch])

  const mobile = isMobile()

  return (
    <ModalForm>
      <ModalHeader
        className={cn(styles.modalHeader, { [styles.mobile]: mobile })}
        onClose={handleClose}
        showDismissButton={!mobile}
      >
        <Text
          variant='label'
          color='neutralLight2'
          size='xLarge'
          strength='strong'
          className={styles.title}
        >
          <Icon size='large' icon={IconCart} />
          {messages.completePurchase}
        </Text>
      </ModalHeader>
      <ModalContent className={styles.content}>
        <>
          <LockedTrackDetailsTile
            track={track as unknown as Track}
            owner={track.user}
          />
          <PurchaseContentFormFields
            stage={stage}
            purchaseSummaryValues={purchaseSummaryValues}
          />
        </>
      </ModalContent>
      <ModalFooter className={styles.footer}>
        <PurchaseContentFormFooter
          error={error}
          isUnlocking={isUnlocking}
          onViewTrackClicked={onClose}
          purchaseSummaryValues={purchaseSummaryValues}
          stage={stage}
          track={track}
        />
      </ModalFooter>
    </ModalForm>
  )
}

export const PremiumContentPurchaseModal = () => {
  const {
    isOpen,
    onClose,
    onClosed,
    data: { contentId: trackId }
  } = usePremiumContentPurchaseModal()

  const { data: track } = useGetTrackById(
    { id: trackId! },
    { disabled: !trackId }
  )

  const { initialValues, validationSchema, onSubmit } =
    usePurchaseContentFormConfiguration({ track })

  const isValidTrack = track && isTrackPurchasable(track)

  if (track && !isValidTrack) {
    console.error('PremiumContentPurchaseModal: Track is not purchasable')
  }

  return (
    <ModalDrawer
      isOpen={isOpen}
      onClose={onClose}
      onClosed={onClosed}
      bodyClassName={styles.modal}
      isFullscreen
      useGradientTitle={false}
      dismissOnClickOutside
    >
      {isValidTrack ? (
        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(validationSchema)}
          onSubmit={onSubmit}
        >
          <RenderForm track={track} onClose={onClose} />
        </Formik>
      ) : null}
    </ModalDrawer>
  )
}

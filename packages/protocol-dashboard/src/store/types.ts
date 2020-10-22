import { RouterState } from 'connected-react-router'
import { State as DiscoveryProviderState } from 'store/cache/discoveryProvider/slice'
import { State as CreatorNodeState } from 'store/cache/creatorNode/slice'
import { State as ProtocolState } from 'store/cache/protocol/slice'
import { State as UserState } from 'store/cache/user/slice'
import { State as AccountState } from 'store/account/slice'
import { State as ProposalsState } from 'store/cache/proposals/slice'
import { State as VotesState } from 'store/cache/votes/slice'
import { State as TimelineState } from 'store/cache/timeline/slice'
import { State as ModalState } from 'store/modal/slice'
import { State as PageHistoryState } from 'store/pageHistory/slice'
import { State as ClaimsState } from 'store/cache/claims/slice'
import { State as AnalyticsState } from 'store/cache/analytics/slice'
import { State as MusicState } from 'store/cache/music/slice'

export type AppState = {
  router: RouterState
  pageHistory: PageHistoryState
  account: AccountState
  modal: ModalState
  cache: {
    discoveryProvider: DiscoveryProviderState
    creatorNode: CreatorNodeState
    protocol: ProtocolState
    user: UserState
    proposals: ProposalsState
    votes: VotesState
    timeline: TimelineState
    claims: ClaimsState
    analytics: AnalyticsState
    music: MusicState
  }
}

export default AppState
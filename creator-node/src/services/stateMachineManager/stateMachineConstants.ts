// Max number of completed/failed jobs to keep in redis for the state monitoring queue
export const MONITORING_QUEUE_HISTORY = 20

// Millis to delay starting the first job in the StateMonitoringQueue (30 seconds)
export const STATE_MONITORING_QUEUE_INIT_DELAY_MS = 1000 * 30

// Millis to timeout request for getting users who have a node as their primary/secondary (60 seconds)
export const GET_NODE_USERS_TIMEOUT_MS = 1000 * 60

// Millis to forcibly cancel getNodeUsers request if axios timeout doesn't work (70 seconds)
export const GET_NODE_USERS_CANCEL_TOKEN_MS = 1000 * 70

// Max number of users to fetch if no maximum is given
export const GET_NODE_USERS_DEFAULT_PAGE_SIZE = 100_000

// Timeout for fetching a clock value for a single user (2 seconds)
export const CLOCK_STATUS_REQUEST_TIMEOUT_MS = 2000

// Number of users to process in each batch when calculating reconfigs
export const FIND_REPLICA_SET_UPDATES_BATCH_SIZE = 50

// Number of users to process in each batch when calculating reconfigs and syncs
export const AGGREGATE_RECONFIG_AND_POTENTIAL_SYNC_OPS_BATCH_SIZE = 500

// Retry delay (in millis) between requests while monitoring a sync
export const SYNC_MONITORING_RETRY_DELAY_MS = 5_000

// Max number of attempts to select new replica set in reconfig
export const MAX_SELECT_NEW_REPLICA_SET_ATTEMPTS = 20

// Max number of attempts to run a job that attempts to issue a manual sync
export const MAX_ISSUE_MANUAL_SYNC_JOB_ATTEMPTS = 2

// Max number of attempts to run a job that attempts to issue a recurring sync
export const MAX_ISSUE_RECURRING_SYNC_JOB_ATTEMPTS = 2

export const QUEUE_HISTORY = Object.freeze({
  // Max number of completed/failed jobs to keep in redis for the monitor-state queue
  MONITOR_STATE: 100,
  // Max number of completed/failed jobs to keep in redis for the find-sync-requests queue
  FIND_SYNC_REQUESTS: 100,
  // Max number of completed/failed jobs to keep in redis for the find-replica-set-updates queue
  FIND_REPLICA_SET_UPDATES: 100,
  // Max number of completed/failed jobs to keep in redis for the cNodeEndpoint->spId map queue
  FETCH_C_NODE_ENDPOINT_TO_SP_ID_MAP: 100,
  // Max number of completed/failed jobs to keep in redis for the manual sync queue
  MANUAL_SYNC: 1_000,
  // Max number of completed/failed jobs to keep in redis for the recurring sync queue
  RECURRING_SYNC: 1_000,
  // Max number of completed/failed jobs to keep in redis for the recover-orphaned-data queue
  RECOVER_ORPHANED_DATA: 1_000
})

export const QUEUE_NAMES = {
  // Queue to slice users and gather data about them
  MONITOR_STATE: 'monitor-state-queue',
  // Queue to find sync requests
  FIND_SYNC_REQUESTS: 'find-sync-requests-queue',
  // Queue to find replica set updates
  FIND_REPLICA_SET_UPDATES: 'find-replica-set-updates-queue',
  // Queue that only processes jobs to fetch the cNodeEndpoint->spId mapping,
  FETCH_C_NODE_ENDPOINT_TO_SP_ID_MAP: 'c-node-endpoint-to-sp-id-map-queue',
  // Queue to issue a manual sync
  MANUAL_SYNC: 'manual-sync-queue',
  // Queue to issue a recurring sync
  RECURRING_SYNC: 'recurring-sync-queue',
  // Queue to search for nodes with orphaned data and merge it into a Replica Set
  RECOVER_ORPHANED_DATA: 'recover-orphaned-data-queue'
} as const
export type TQUEUE_NAMES = typeof QUEUE_NAMES[keyof typeof QUEUE_NAMES]

export const MAX_QUEUE_RUNTIMES = Object.freeze({
  // Max millis to run a monitor-state job for before marking it as stalled
  MONITOR_STATE:
    30 /* min */ *
    60 *
    1000 /* Should actually be 5 minutes after optimizations */,
  // Max millis to run a find-sync-requests job for before marking it as stalled
  FIND_SYNC_REQUESTS: 5 /* min */ * 60 * 1000,
  // Max millis to run a find-replica-set-updates job for before marking it as stalled
  FIND_REPLICA_SET_UPDATES: 5 /* min */ * 60 * 1000,
  // Max millis to run a fetch cNodeEndpoint->spId mapping job for before marking it as stalled
  FETCH_C_NODE_ENDPOINT_TO_SP_ID_MAP: 5 /* min */ * 60 * 1000,
  // Max millis to run a manual sync job for before marking it as stalled
  MANUAL_SYNC: 1 /* min */ * 60 * 1000,
  // Max millis to run a recurring sync job for before marking it as stalled
  RECURRING_SYNC: 6 /* min */ * 60 * 1000,
  // Max millis to run a recover-orphaned-data job for before marking it as stalled
  RECOVER_ORPHANED_DATA: 3 /* hours */ * 60 /* min */ * 60 * 1000
})

// Describes the type of sync operation
export const SyncType = Object.freeze({
  Recurring: 'RECURRING', // Scheduled background sync to keep secondaries up to date
  Manual: 'MANUAL' // Triggered by a user data write to primary
})

// Sync mode for a (primary, secondary) pair for a user
export const SYNC_MODES = Object.freeze({
  // Replicas already in sync - no further sync needed
  None: 'NONE',

  // Base case - secondary should sync its local state to primary's state
  SyncSecondaryFromPrimary: 'SYNC_SECONDARY_FROM_PRIMARY',

  // Edge case - secondary has state that primary needs: primary should merge its local state with secondary's state, and have secondary re-sync its entire local state
  MergePrimaryAndSecondary: 'MERGE_PRIMARY_AND_SECONDARY',

  // Edge case - same as MergePrimaryAndSecondary but wipes secondary's state instead of re-syncing from primary
  MergePrimaryThenWipeSecondary: 'MERGE_PRIMARY_THEN_WIPE_SECONDARY'
})

export const FETCH_FILES_HASH_NUM_RETRIES = 3
export const FETCH_FILES_HASH_MAX_TIMEOUT_MS = 10_000

// Seconds to hold the cache of healthy content nodes for update-replica-set jobs
export const HEALTHY_SERVICES_TTL_SEC = 60 /* 1 min */

// Number of users to query in each orphaned data recovery query to Discovery and to its own db
export const ORPHANED_DATA_NUM_USERS_PER_QUERY = 2000

// Milliseconds after which to gracefully end a recover-orphaned-data job early
export const MAX_MS_TO_ISSUE_RECOVER_ORPHANED_DATA_REQUESTS =
  2 /* hours */ * 60 /* minutes */ * 60 /* seconds */ * 1000

const FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES_PREFIX =
  'FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES'
export const FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES_CONSTS = {
  FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES_PREFIX,
  LOCAL_DB_ENTRIES_SET_KEY_PREFIX: `${FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES_PREFIX}_LOCAL_ENTRIES_SET`,
  FETCHED_ENTRIES_SET_KEY_PREFIX: `${FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES_PREFIX}_FETCHED_ENTRIES_SET`,
  UNIQUE_FETCHED_ENTRIES_SET_KEY_PREFIX: `${FILTER_OUT_ALREADY_PRESENT_DB_ENTRIES_PREFIX}_UNIQUE_FETCHED_ENTRIES_SET`
}

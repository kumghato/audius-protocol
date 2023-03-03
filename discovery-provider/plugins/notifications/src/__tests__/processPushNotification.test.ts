import { expect, jest, test } from '@jest/globals';
import { Processor } from '../main';
import * as sns from '../sns'
import { getRedisConnection } from './../utils/redisConnection'
import { config } from './../config'
import {
  randId,
  createChat,
  readChat,
  createUsers,
  insertFollows,
  insertMessage,
  insertReaction,
  setupTwoUsersWithDevices,
  insertMobileDevices,
  insertMobileSettings,
  createTestDB,
  dropTestDB,
  replaceDBName
} from '../utils/populateDB';

describe('Push Notifications', () => {
  let processor: Processor
  const sendPushNotificationSpy = jest.spyOn(sns, 'sendPushNotification')
    .mockImplementation(() => Promise.resolve())

  beforeEach(async () => {
    const testName = expect.getState().currentTestName.replace(/\s/g, '_').toLocaleLowerCase()
    await Promise.all([
      createTestDB(process.env.DN_DB_URL, testName),
      createTestDB(process.env.IDENTITY_DB_URL, testName)
    ])

    const redis = await getRedisConnection()
    redis.del(config.lastIndexedMessageRedisKey)
    redis.del(config.lastIndexedReactionRedisKey)
    processor = new Processor()
    await processor.init({
      identityDBUrl: replaceDBName(process.env.IDENTITY_DB_URL, testName),
      discoveryDBUrl: replaceDBName(process.env.DN_DB_URL, testName),
    })
  })

  afterEach(async () => {
    jest.clearAllMocks()
    processor.stop()
    await processor?.close()
    const testName = expect.getState().currentTestName.replace(/\s/g, '_').toLocaleLowerCase()
    await Promise.all([
      dropTestDB(process.env.DN_DB_URL, testName),
      dropTestDB(process.env.IDENTITY_DB_URL, testName),
    ])
  })

  test.skip("Process follow for ios", async () => {
    await createUsers(processor.discoveryDB, [{ user_id: 1 }, { user_id: 2 }])
    await insertFollows(processor.discoveryDB, [{ follower_user_id: 1, followee_user_id: 2 }])
    await insertMobileSettings(processor.identityDB, [{ userId: 2 }])
    await insertMobileDevices(processor.identityDB, [{ userId: 2 }])
    await new Promise(resolve => setTimeout(resolve, 10))

    const pending = processor.listener.takePending()
    expect(pending?.appNotifications).toHaveLength(1)
    // Assert single pending
    await processor.appNotificationsProcessor.process(pending.appNotifications)

    expect(sendPushNotificationSpy).toHaveBeenCalledWith({
      type: 'ios',
      targetARN: 'arn:2',
      badgeCount: 0
    }, {
      title: 'Follow',
      body: 'user_1 followed you',
      data: {}
    })
  })

  test("Process DM for ios", async () => {
    const { user1, user2 } = await setupTwoUsersWithDevices(processor.discoveryDB, processor.identityDB)

    // Start processor
    processor.start()
    // Let notifications job run for a few cycles to initialize the min cursors in redis
    await new Promise((r) => setTimeout(r, config.pollInterval * 2))

    // User 1 sent message config.dmNotificationDelay ms ago
    const message = "hi from user 1"
    const messageId = randId().toString()
    const messageTimestampMs = Date.now() - config.dmNotificationDelay
    const messageTimestamp = new Date(messageTimestampMs)
    const chatId = randId().toString()
    await createChat(processor.discoveryDB, user1.userId, user2.userId, chatId, messageTimestamp)
    await insertMessage(processor.discoveryDB, user1.userId, chatId, messageId, message, messageTimestamp)

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).toHaveBeenCalledTimes(1)
    expect(sendPushNotificationSpy).toHaveBeenCalledWith({
      type: user2.deviceType,
      targetARN: user2.awsARN,
      badgeCount: 0
    }, {
      title: 'Message',
      body: `New message from ${user1.name}`,
      data: {}
    })

    jest.clearAllMocks()

    // User 2 reacted to user 1's message config.dmNotificationDelay ms ago
    const reaction = "fire"
    const reactionTimestampMs = Date.now() - config.dmNotificationDelay
    await insertReaction(processor.discoveryDB, user2.userId, messageId, reaction, new Date(reactionTimestampMs))

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).toHaveBeenCalledTimes(1)
    expect(sendPushNotificationSpy).toHaveBeenCalledWith({
      type: user1.deviceType,
      targetARN: user1.awsARN,
      badgeCount: 0
    }, {
      title: 'Reaction',
      body: `${user2.name} reacted ${reaction} to your message`,
      data: {}
    })
  })

  test("Does not send DM notifications when sender is receiver", async () => {
    const { user1, user2 } = await setupTwoUsersWithDevices(processor.discoveryDB, processor.identityDB)

    // Start processor
    processor.start()
    // Let notifications job run for a few cycles to initialize the min cursors in redis
    await new Promise((r) => setTimeout(r, config.pollInterval * 2))

    // User 1 sent message config.dmNotificationDelay ms ago
    const message = "hi from user 1"
    const messageId = randId().toString()
    const messageTimestampMs = Date.now() - config.dmNotificationDelay
    const messageTimestamp = new Date(messageTimestampMs)
    const chatId = randId().toString()
    await createChat(processor.discoveryDB, user1.userId, user2.userId, chatId, messageTimestamp)
    await insertMessage(processor.discoveryDB, user1.userId, chatId, messageId, message, messageTimestamp)

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).toHaveBeenCalledTimes(1)
    expect(sendPushNotificationSpy).toHaveBeenCalledWith({
      type: user2.deviceType,
      targetARN: user2.awsARN,
      badgeCount: 0
    }, {
      title: 'Message',
      body: `New message from ${user1.name}`,
      data: {}
    })

    jest.clearAllMocks()

    // User 1 reacted to user 1's message config.dmNotificationDelay ms ago
    const reaction = "fire"
    const reactionTimestampMs = Date.now() - config.dmNotificationDelay
    await insertReaction(processor.discoveryDB, user1.userId, messageId, reaction, new Date(reactionTimestampMs))

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).not.toHaveBeenCalled()
  })

  test("Does not send DM notifications created fewer than delay minutes ago", async () => {
    const { user1, user2 } = await setupTwoUsersWithDevices(processor.discoveryDB, processor.identityDB)

    // Start processor
    processor.start()
    // Let notifications job run for a few cycles to initialize the min cursors in redis
    await new Promise((r) => setTimeout(r, config.pollInterval * 2))

    // User 1 sends message now
    const message = "hi from user 1"
    const messageId = randId().toString()
    const messageTimestamp = new Date(Date.now())
    const chatId = randId().toString()
    await createChat(processor.discoveryDB, user1.userId, user2.userId, chatId, messageTimestamp)
    await insertMessage(processor.discoveryDB, user1.userId, chatId, messageId, message, messageTimestamp)

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).not.toHaveBeenCalled
  })

  test("Does not send DM reaction notifications created fewer than delay minutes ago", async () => {
    const { user1, user2 } = await setupTwoUsersWithDevices(processor.discoveryDB, processor.identityDB)

    // Set up chat and message
    const message = "hi from user 1"
    const messageId = randId().toString()
    const messageTimestamp = new Date(Date.now())
    const chatId = randId().toString()
    await createChat(processor.discoveryDB, user1.userId, user2.userId, chatId, messageTimestamp)
    await insertMessage(processor.discoveryDB, user1.userId, chatId, messageId, message, messageTimestamp)

    // Start processor
    processor.start()
    // Let notifications job run for a few cycles to initialize the min cursors in redis
    await new Promise((r) => setTimeout(r, config.pollInterval * 2))

    // User 2 reacts to user 1's message now
    const reaction = "fire"
    await insertReaction(processor.discoveryDB, user2.userId, messageId, reaction, new Date(Date.now()))

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).not.toHaveBeenCalled
  })

  test("Does not send DM notifications for messages that have been read", async () => {
    const { user1, user2 } = await setupTwoUsersWithDevices(processor.discoveryDB, processor.identityDB)

    // Start processor
    processor.start()
    // Let notifications job run for a few cycles to initialize the min cursors in redis
    await new Promise((r) => setTimeout(r, config.pollInterval * 2))

    // User 1 sent message config.dmNotificationDelay ms ago
    const message = "hi from user 1"
    const messageId = randId().toString()
    const messageTimestampMs = Date.now() - config.dmNotificationDelay
    const messageTimestamp = new Date(messageTimestampMs)
    const chatId = randId().toString()
    await createChat(processor.discoveryDB, user1.userId, user2.userId, chatId, messageTimestamp)
    await insertMessage(processor.discoveryDB, user1.userId, chatId, messageId, message, messageTimestamp)
    // User 2 reads chat
    await readChat(processor.discoveryDB, user2.userId, chatId, new Date(Date.now()))

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).not.toHaveBeenCalled

    jest.clearAllMocks()

    // User 2 reacted to user 1's message config.dmNotificationDelay ms ago
    const reaction = "fire"
    const reactionTimestampMs = Date.now() - config.dmNotificationDelay
    await insertReaction(processor.discoveryDB, user2.userId, messageId, reaction, new Date(reactionTimestampMs))

    // User 1 reads chat
    await readChat(processor.discoveryDB, user1.userId, chatId, new Date(Date.now()))

    await new Promise((r) => setTimeout(r, config.pollInterval * 2))
    expect(sendPushNotificationSpy).not.toHaveBeenCalled
  })
})
// ./backend/scripts/seed2Posts.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post } from '../models'
import { convertISO8601ToFormatted } from './seeder-utils/usefulFunctions'
import { initLogger, log, closeLogger } from '../utils/logger'


// ==============================< CONFIG >===============================
initLogger('timestamp', 'seed2Posts', './Logs-Seeders')

// Number of posts per user.
const minPosts = 10
const maxPosts = 40

// Post title length (in sentences).
const minTitleSentences = 1
const maxTitleSentences = 3

// Paragraph config (post body).
const minParagraphs = 2
const maxParagraphs = 5
const minSentencesPerParagraph = 3
const maxSentencesPerParagraph = 8

// % chance a post gets edited.
const percentPostBecomesEdited = 0.2

// Date randomize config.
const dateA = new Date('2020-01-01T00:00:00')
const dateB = new Date('2025-05-11T23:59:59')

// =========================< MAIN FUNCTION(S) >==========================
async function seedPosts() {
  const startTime = Date.now()
  log(`[start] Starting post seeding at: ${convertISO8601ToFormatted(new Date(startTime).toISOString())}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await sequelize.authenticate()

  const users = await User.findAll()
  if (!users.length) {
    throw new Error('[error] No users found. Run seedUsers.ts first.')
  }

  let totalPostsCreated = 0

  for (const user of users) {
    const numPosts = faker.number.int({ min: minPosts, max: maxPosts })
    log(`Creating ${numPosts} posts for user ${user.username || user.id}...`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

    for (let i = 0; i < numPosts; i++) {
      const title = faker.lorem.sentences(faker.number.int({ min: minTitleSentences, max: maxTitleSentences })).slice(0, 100)

      const numParagraphs = faker.number.int({ min: minParagraphs, max: maxParagraphs })
      const content = Array.from({ length: numParagraphs }, () => {
        const sentenceCount = faker.number.int({ min: minSentencesPerParagraph, max: maxSentencesPerParagraph })
        return faker.lorem.sentences(sentenceCount)
      }).join('\n\n')

      const createdAt = faker.date.between({ from: dateA, to: dateB })
      const isEdited = Math.random() < percentPostBecomesEdited
      const updatedAt = isEdited ? faker.date.between({ from: createdAt, to: dateB }) : undefined

      await Post.create({
        userId: user.id,
        title,
        content,
        createdAt,
        ...(updatedAt && { updatedAt })
      }, { silent: true })

      totalPostsCreated++
    }
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  log(`[success] Finished seeding ${totalPostsCreated} posts for ${users.length} users.`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[time] Finished at: ${convertISO8601ToFormatted(new Date(endTime).toISOString())} (Duration: ${duration} ms)`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await closeLogger()
  process.exit(0)
}

seedPosts().catch((err) => {
  (async () => {
    log(`Post seeding failed: ${err}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

    await closeLogger()
    process.exit(1)
  })()
})

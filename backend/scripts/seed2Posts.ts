// ./backend/scripts/seed2Posts.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post } from '../models'


// ==============================< CONFIG >===============================
// Number of posts per user
const minPosts = 5
const maxPosts = 15

// Post title length (in sentences).
// Assume 1 sentence = ~5.5 and 2 = ~12.
const minTitleSentences = 5
const maxTitleSentences = 12

// Paragraph config (post body)
const minParagraphs = 2
const maxParagraphs = 5
const minSentencesPerParagraph = 2
const maxSentencesPerParagraph = 5

// % chance a post gets edited
const percentPostBecomesEdited = 0.2

// Date randomize config.
const dateA = new Date('2020-01-01T00:00:00')
const dateB = new Date('2025-05-03T23:59:59')


// =========================< MAIN FUNCTION(S) >==========================
async function seedPosts() {
  const startTime = Date.now()
  console.log(`🚀 Starting post seeding at: ${new Date(startTime).toISOString()}`)

  await sequelize.sync()

  const users = await User.findAll()
  if (!users.length) {
    throw new Error('No users found. Run seedUsers.ts first.')
  }

  let totalPostsCreated = 0

  for (const user of users) {
    const numPosts = faker.number.int({ min: minPosts, max: maxPosts })
    console.log(`📝 Creating ${numPosts} posts for user ${user.username || user.id}...`)

    for (let i = 0; i < numPosts; i++) {
      const title = faker.lorem.sentence({ min: minTitleSentences, max: maxTitleSentences }).slice(0, 100)

      const numParagraphs = faker.number.int({ min: minParagraphs, max: maxParagraphs })
      const content = Array.from({ length: numParagraphs }, () => {
        const sentenceCount = faker.number.int({ min: minSentencesPerParagraph, max: maxSentencesPerParagraph })

        return Array.from({ length: sentenceCount }, () =>
          faker.lorem.sentence({ min: 6, max: 14 })  // Cleaner English-like sentences
        ).join(' ')
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

  console.log(`✅ Finished seeding ${totalPostsCreated} posts for ${users.length} users.`)
  console.log(`🕒 Finished at: ${new Date(endTime).toISOString()} (Duration: ${duration} ms)`)

  process.exit(0)
}

seedPosts().catch((err) => {
  console.error('❌ Post seeding failed:', err)

  process.exit(1)
})

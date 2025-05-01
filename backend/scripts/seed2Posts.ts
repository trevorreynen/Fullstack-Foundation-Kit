// ./backend/scripts/seed2Posts.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post } from '../models'


// ==============================< CONFIG >===============================
// Number posts config.
const minPosts = 20
const maxPosts = 100

// Post title length config.
const minTitleSentences = 1
const maxTitleSentences = 2

// Paragraph config.
const minParagraphs = 1
const maxParagraphs = 4
const minSentencesPerParagraph = 3
const maxSentencesPerParagraph = 7

// Chance a post will be edited by a user.
const percentPostBecomesEdited = 0.15

// Date randomize config.
const dateA = new Date('2020-01-01T00:00:00')
const dateB = new Date('2024-12-31T23:59:59')


// =========================< MAIN FUNCTION(S) >==========================
async function seedPosts() {
  await sequelize.sync()

  const users = await User.findAll()
  if (!users.length) {
    throw new Error('No users found. Run seedUsers.ts first.')
  }

  for (const user of users) {
    const numPosts = faker.number.int({ min: minPosts, max: maxPosts })

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
    }
  }

  console.log(`✅ Posts seeded for ${users.length} users.`)

  process.exit(0)
}


seedPosts().catch((err) => {
  console.error('❌ Post seeding failed:', err)

  process.exit(1)
})


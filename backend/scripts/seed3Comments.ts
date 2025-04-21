// ./backend/scripts/seed3Comments.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post, Comment } from '../models'


// ==============================< CONFIG >===============================
// Number of comments per post.
const minCommentsPerPost = 1
const maxCommentsPerPost = 4

// Number of sentences per comment.
const minSentencesPerComment = 1
const maxSentencesPerComment = 3

// Chance a comment will be edited by a user.
const percentCommentBecomesEdited = 0.15

// Percent of users selected to make comments with.
const userSelectionPercent = 0.6

// Percent of total posts the user will comment on.
const postSelectionPercent = 0.5


// =========================< MAIN FUNCTION(S) >==========================
async function seedComments() {
  await sequelize.sync()

  const users = await User.findAll()
  const posts = await Post.findAll()

  if (!users.length || !posts.length) {
    throw new Error('No users or posts found. Run user/post seeders first.')
  }

  const selectedUsers = users.filter(() => Math.random() < userSelectionPercent)

  for (const user of selectedUsers) {
    const postsToCommentOn = posts.filter(() => Math.random() < postSelectionPercent)

    for (const post of postsToCommentOn) {
      const commentCount = faker.number.int({ min: minCommentsPerPost, max: maxCommentsPerPost })

      for (let i = 0; i < commentCount; i++) {
        const content = faker.lorem.sentences(faker.number.int({ min: minSentencesPerComment, max: maxSentencesPerComment }))
        const createdAt = faker.date.between({
          from: post.createdAt,
          to: new Date()
        })

        const isEdited = Math.random() < percentCommentBecomesEdited
        const updatedAt = isEdited
          ? faker.date.between({ from: createdAt, to: new Date() })
          : undefined

        await Comment.create({
          userId: user.id,
          postId: post.id,
          content,
          createdAt,
          ...(isEdited && { updatedAt })
        }, { silent: true })
      }
    }
  }

  console.log(`✅ Comment seeding complete for ${selectedUsers.length} users.`)
  process.exit(0)
}

seedComments().catch(err => {
  console.error('❌ Comment seeding failed:', err)
  process.exit(1)
})

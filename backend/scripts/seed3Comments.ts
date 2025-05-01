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


// Percent of users selected to reply to comments with.
const userSelectionReplyPercent = 0.5

// Number of replies per comment.
const minRepliesPerComment = 1
const maxRepliesPerComment = 2


// =========================< MAIN FUNCTION(S) >==========================
async function seedComments() {
  await sequelize.sync()

  const users = await User.findAll()
  const posts = await Post.findAll()

  if (!users.length || !posts.length) {
    throw new Error('No users or posts found. Run user/post seeders first.')
  }


  // FIRST PHASE: Top-Level Comments
  const selectedUsers = users.filter(() => Math.random() < userSelectionPercent)

  for (const user of selectedUsers) {
    const postsToCommentOn = posts.filter(() => Math.random() < postSelectionPercent)

    for (const post of postsToCommentOn) {
      const commentCount = faker.number.int({ min: minCommentsPerPost, max: maxCommentsPerPost })

      for (let i = 0; i < commentCount; i++) {
        const content = faker.lorem.sentences(faker.number.int({ min: minSentencesPerComment, max: maxSentencesPerComment }))
        const createdAt = faker.date.between({ from: post.createdAt, to: new Date() })

        const isEdited = Math.random() < percentCommentBecomesEdited
        const updatedAt = isEdited ? faker.date.between({ from: createdAt, to: new Date() }) : undefined

        await Comment.create({
          userId: user.id,
          postId: post.id,
          content,
          createdAt,
          ...(updatedAt && { updatedAt })
        }, { silent: true })
      }
    }
  }

  console.log(`✅ Comment seeding complete for ${selectedUsers.length} users.`)


  // SECOND PHASE: Replies to Comments
  const freshComments = await Comment.findAll({ where: { parentCommentId: null } })
  const replyUsers = users.filter(() => Math.random() < userSelectionReplyPercent)

  for (const user of replyUsers) {
    const postsToReplyOn = posts.filter(() => Math.random() < postSelectionPercent)

    for (const post of postsToReplyOn) {
      const postComments = freshComments.filter(comment => comment.postId === post.id && comment.userId !== user.id)

      if (postComments.length === 0) continue

      const commentsToReplyTo = faker.helpers.arrayElements(postComments, faker.number.int({ min: 4, max: 5 }))

      for (const comment of commentsToReplyTo) {
        const numReplies = faker.number.int({ min: minRepliesPerComment, max: maxRepliesPerComment })

        for (let i = 0; i < numReplies; i++) {
          const content = faker.lorem.sentences(faker.number.int({ min: minSentencesPerComment, max: maxSentencesPerComment }))
          const createdAt = faker.date.between({ from: comment.createdAt, to: new Date() })

          const isEdited = Math.random() < percentCommentBecomesEdited
          const updatedAt = isEdited ? faker.date.between({ from: createdAt, to: new Date() }) : undefined

          await Comment.create({
            userId: user.id,
            postId: post.id,
            parentCommentId: comment.id,
            content,
            createdAt,
            ...(updatedAt && { updatedAt })
          }, { silent: true })
        }
      }
    }
  }

  console.log(`✅ Nested replies complete for ${replyUsers.length} users.`)

  process.exit(0)
}


seedComments().catch(err => {
  console.error('❌ Comment seeding failed:', err)

  process.exit(1)
})


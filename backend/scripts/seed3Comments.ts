// ./backend/scripts/seed3Comments.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post, Comment } from '../models'


// ==============================< CONFIG >===============================
// Top-level comments per post.
const minCommentsPerPost = 2
const maxCommentsPerPost = 3

// Sentences per comment.
const minSentencesPerComment = 1
const maxSentencesPerComment = 2

// % chance a comment is edited.
const percentCommentBecomesEdited = 0.1

// % of users who will leave comments.
const userSelectionPercent = 0.5

// % of posts each selected user comments on.
const postSelectionPercent = 0.3

// % of users who will reply to existing comments.
const userSelectionReplyPercent = 0.4     // fewer users reply than top-level comment

// Number of replies per comment.
const minRepliesPerComment = 1
const maxRepliesPerComment = 1


// =========================< MAIN FUNCTION(S) >==========================
async function seedComments() {
  const startTime = Date.now()
  console.log(`💬 Starting comment seeding at: ${new Date(startTime).toISOString()}`)

  await sequelize.sync()

  const users = await User.findAll()
  const posts = await Post.findAll()

  if (!users.length || !posts.length) {
    throw new Error('No users or posts found. Run user/post seeders first.')
  }

  let totalTopLevelComments = 0

  // Phase 1 — Top-level Comments
  const selectedUsers = users.filter(() => Math.random() < userSelectionPercent)

  for (const user of selectedUsers) {
    console.log(`🗨️  User ${user.username || user.id} adding comments...`)
    const postsToCommentOn = posts.filter(() => Math.random() < postSelectionPercent)

    for (const post of postsToCommentOn) {
      const commentCount = faker.number.int({ min: minCommentsPerPost, max: maxCommentsPerPost })

      for (let i = 0; i < commentCount; i++) {
        const sentenceCount = faker.number.int({ min: minSentencesPerComment, max: maxSentencesPerComment })
        const content = Array.from({ length: sentenceCount }, () =>
          faker.lorem.sentence({ min: 6, max: 12 })
        ).join(' ')

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

        totalTopLevelComments++
      }
    }
  }

  console.log(`✅ Top-level comments complete: ${totalTopLevelComments} total.`)

  // Phase 2 — Replies
  const replyStartTime = Date.now()
  let totalReplies = 0

  const freshComments = await Comment.findAll({ where: { parentCommentId: null } })
  const replyUsers = users.filter(() => Math.random() < userSelectionReplyPercent)

  for (const user of replyUsers) {
    console.log(`↪️  User ${user.username || user.id} replying to comments...`)
    const postsToReplyOn = posts.filter(() => Math.random() < postSelectionPercent)

    for (const post of postsToReplyOn) {
      const postComments = freshComments.filter(comment => comment.postId === post.id && comment.userId !== user.id)
      if (!postComments.length) continue

      const commentsToReplyTo = faker.helpers.arrayElements(postComments, faker.number.int({ min: 4, max: 5 }))

      for (const comment of commentsToReplyTo) {
        const numReplies = faker.number.int({ min: minRepliesPerComment, max: maxRepliesPerComment })

        for (let i = 0; i < numReplies; i++) {
          const sentenceCount = faker.number.int({ min: minSentencesPerComment, max: maxSentencesPerComment })
          const content = Array.from({ length: sentenceCount }, () =>
            faker.lorem.sentence({ min: 6, max: 12 })
          ).join(' ')

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

          totalReplies++
        }
      }
    }
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  console.log(`✅ Nested replies complete: ${totalReplies} replies.`)
  console.log(`🎉 Finished seeding comments.`)
  console.log(`🧾 Total Comments: ${totalTopLevelComments + totalReplies} (Top-level: ${totalTopLevelComments}, Replies: ${totalReplies})`)
  console.log(`🕒 Finished at: ${new Date(endTime).toISOString()} (Duration: ${duration} ms)`)

  process.exit(0)
}

seedComments().catch(err => {
  console.error('❌ Comment seeding failed:', err)

  process.exit(1)
})

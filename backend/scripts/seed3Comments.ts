// ./backend/scripts/seed3Comments.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post, Comment } from '../models'
import { convertISO8601ToFormatted } from './seeder-utils/usefulFunctions'
import { initLogger, log, closeLogger } from '../utils/logger'


// ==============================< CONFIG >===============================
initLogger('timestamp', 'seed3Comments', './Logs-Seeders')

// % of users who will leave comments.
const userSelectionPercent = 0.4

// % of posts each selected user comments on.
const postSelectionPercent = 0.3

// Top-level comments per post.
const minCommentsPerPost = 1
const maxCommentsPerPost = 2

// Sentences per comment.
const minSentencesPerComment = 1
const maxSentencesPerComment = 2

// % chance a comment is edited.
const percentCommentBecomesEdited = 0.1

// % of users who will reply to existing comments.
const userSelectionReplyPercent = 0.4     // fewer users reply than top-level comment

// Number of top-level comments in a post to reply to.
const minCommentToReply = 2
const maxCommentToReply = 4

// Number of replies per comment.
const minRepliesPerComment = 1
const maxRepliesPerComment = 1


// =========================< MAIN FUNCTION(S) >==========================
async function seedComments() {
  const startTime = Date.now()
  log(`[start] Starting comment seeding at: ${convertISO8601ToFormatted(new Date(startTime).toISOString())}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await sequelize.authenticate()

  const users = await User.findAll()
  const posts = await Post.findAll()

  if (!users.length || !posts.length) {
    throw new Error('No users or posts found. Run user/post seeders first.')
  }


  // 1. Top-level Comments.
  let totalTopLevelComments = 0

  const selectedUsers = users.filter(() => Math.random() < userSelectionPercent)

  for (const user of selectedUsers) {
    log(`  User ${user.username || user.id} adding top-level comments...`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
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

        totalTopLevelComments++
      }
    }
  }

  log(`[success] Top-level comments complete: ${totalTopLevelComments} total.`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })


  // 2. Replies.
  let totalReplies = 0

  const freshComments = await Comment.findAll({ where: { parentCommentId: null } })
  const replyUsers = users.filter(() => Math.random() < userSelectionReplyPercent)

  for (const user of replyUsers) {
    log(`  User ${user.username || user.id} replying to comments...`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
    const postsToReplyOn = posts.filter(() => Math.random() < postSelectionPercent)

    for (const post of postsToReplyOn) {
      const postComments = freshComments.filter(comment => comment.postId === post.id && comment.userId !== user.id)
      if (!postComments.length) {
        continue
      }

      const commentsToReplyTo = faker.helpers.arrayElements(postComments, faker.number.int({ min: minCommentToReply, max: maxCommentToReply }))

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

          totalReplies++
        }
      }
    }
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  log(`[success] Nested replies complete: ${totalReplies} replies.`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[done] Finished seeding comments.`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[note] Total Comments: ${totalTopLevelComments + totalReplies} (Top-level: ${totalTopLevelComments}, Replies: ${totalReplies})`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[time] Finished at: ${convertISO8601ToFormatted(new Date(endTime).toISOString())} (Duration: ${duration} ms)`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await closeLogger()
  process.exit(0)
}

seedComments().catch(err => {
  (async () => {
    log(`Comment seeding failed: ${err}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

    await closeLogger()
    process.exit(1)
  })()
})

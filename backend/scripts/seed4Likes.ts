// ./backend/scripts/seed4Likes.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post, Comment, Like } from '../models'


// ==============================< CONFIG >===============================
// % of users selected to like
const userSelectionPercent = 0.6

// % of posts liked per selected user
const postLikePercent = 0.3

// % of comments liked per post
const commentLikePercent = 0.15

// % chance to bias toward popular comment instead of random
const popularityBiasPercent = 0.5

// Nested replies to like per liked comment
const nestedReplyLikesMin = 0
const nestedReplyLikesMax = 1


// =========================< MAIN FUNCTION(S) >==========================
async function seedLikes() {
  const startTime = Date.now()
  console.log(`👍 Starting likes seeding at: ${new Date(startTime).toISOString()}`)

  await sequelize.sync()

  const users = await User.findAll()
  const posts = await Post.findAll()
  const comments = await Comment.findAll({ include: [{ model: Comment, as: 'replies' }] })

  if (!users.length || !posts.length) {
    throw new Error('No users or posts found.')
  }

  const selectedUsers = users.filter(() => Math.random() < userSelectionPercent)
  const likeCache = new Set<string>()

  let totalLikes = 0

  for (const user of selectedUsers) {
    const userStart = Date.now()
    console.log(`\n🙋‍♂️ User ${user.username || user.id} starting likes at ${new Date(userStart).toISOString()}`)

    const postsToLike = posts.filter(() => Math.random() < postLikePercent)

    for (const post of postsToLike) {
      const postKey = `${user.id}-post-${post.id}`
      if (!likeCache.has(postKey)) {
        await Like.create({ userId: user.id, postId: post.id })
        likeCache.add(postKey)
        totalLikes++
      }

      const postComments = comments.filter(c => c.postId === post.id && c.parentCommentId === null)
      if (!postComments.length) continue

      const commentsToLike = postComments.filter(() => Math.random() < commentLikePercent)

      for (const comment of commentsToLike) {
        const simulatePopular = Math.random() < popularityBiasPercent
        const targetComment = simulatePopular ? faker.helpers.arrayElement(postComments) : comment
        const commentKey = `${user.id}-comment-${targetComment.id}`

        if (!likeCache.has(commentKey)) {
          await Like.create({ userId: user.id, commentId: targetComment.id })
          likeCache.add(commentKey)
          totalLikes++
        }

        const replies = Array.isArray((targetComment as any).replies) ? ((targetComment as any).replies as Comment[]) : []

        if (replies.length > 0) {
          const repliesToLike = faker.helpers.arrayElements(replies, faker.number.int({ min: nestedReplyLikesMin, max: nestedReplyLikesMax }))

          for (const reply of repliesToLike) {
            if (!reply?.id) continue

            const replyKey = `${user.id}-comment-${reply.id}`
            if (!likeCache.has(replyKey)) {
              await Like.create({ userId: user.id, commentId: reply.id })
              likeCache.add(replyKey)
              totalLikes++
            }
          }
        }
      }
    }

    const userEnd = Date.now()

    console.log(`✅ User ${user.username || user.id} finished at ${new Date(userEnd).toISOString()} (Duration: ${userEnd - userStart} ms)`)
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  console.log(`\n🎯 Finished seeding likes for ${selectedUsers.length} users.`)
  console.log(`🧾 Total Likes Created: ${totalLikes}`)
  console.log(`🕒 Finished at: ${new Date(endTime).toISOString()} (Duration: ${duration} ms)`)

  process.exit(0)
}

seedLikes().catch(err => {
  console.error('❌ Likes seeding failed:', err)

  process.exit(1)
})

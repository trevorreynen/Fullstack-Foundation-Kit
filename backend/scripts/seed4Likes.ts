// ./backend/scripts/seed4Likes.ts

// Imports
import { faker } from '@faker-js/faker'
import { sequelize } from '../config/database'
import { User, Post, Comment, Like } from '../models'


// ==============================< CONFIG >===============================
// Percent of users selected
const userSelectionPercent = 0.7

// Percent of posts liked per user
const postLikePercent = 0.5

// Percent of comments liked inside a liked post
const commentLikePercent = 0.35

// Percent chance to pick popular comment instead of random comment
const popularityBiasPercent = 0.5

// Number of nested replies to like under a liked comment
const nestedReplyLikesMin = 1
const nestedReplyLikesMax = 2


// =========================< MAIN FUNCTION(S) >==========================
async function seedLikes() {
  await sequelize.sync()

  const users = await User.findAll()
  const posts = await Post.findAll()
  const comments = await Comment.findAll({ include: [{ model: Comment, as: 'replies' }] })

  if (!users.length || !posts.length) {
    throw new Error('No users or posts found.')
  }

  const selectedUsers = users.filter(() => Math.random() < userSelectionPercent)
  const likeCache = new Set<string>()

  for (const user of selectedUsers) {
    const postsToLike = posts.filter(() => Math.random() < postLikePercent)

    for (const post of postsToLike) {
      const postKey = `${user.id}-post-${post.id}`
      if (!likeCache.has(postKey)) {
        await Like.create({ userId: user.id, postId: post.id })
        likeCache.add(postKey)
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
        }

        // Like replies to this comment
        const replies = Array.isArray((targetComment as any).replies) ? (targetComment as any).replies as Comment[] : []

        if (replies.length > 0) {
          const repliesToLike = faker.helpers.arrayElements(replies, faker.number.int({ min: nestedReplyLikesMin, max: nestedReplyLikesMax }))

          for (const reply of repliesToLike) {
            if (!reply?.id) continue

            const replyKey = `${user.id}-comment-${reply.id}`
            if (!likeCache.has(replyKey)) {
              await Like.create({ userId: user.id, commentId: reply.id })
              likeCache.add(replyKey)
            }
          }
        }
      }
    }
  }

  console.log(`✅ Likes seeded for ${selectedUsers.length} users.`)

  process.exit(0)
}


seedLikes().catch(err => {
  console.error('❌ Likes seeding failed:', err)

  process.exit(1)
})


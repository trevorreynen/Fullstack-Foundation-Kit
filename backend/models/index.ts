// ./backend/models/index.ts
// import { User, Post, Comment, Like, UserSettings } from '../models'

import User from './User'
import Post from './Post'
import Comment from './Comment'
import Like from './Like'
import UserSettings from './UserSettings'


// ===========================< ASSOCIATIONS >============================

// User -> UserSettings (1:1)
User.hasOne(UserSettings, { foreignKey: 'userId', as: 'settings', onDelete: 'CASCADE' })
UserSettings.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// User -> Posts (1:M)
User.hasMany(Post, { foreignKey: 'userId', as: 'posts', onDelete: 'CASCADE'})
Post.belongsTo(User, { foreignKey: 'userId', as: 'user' })

// User -> Likes (1:M)
User.hasMany(Like, { foreignKey: 'userId', as: 'likes', onDelete: 'CASCADE' })
Like.belongsTo(User, { foreignKey: 'userId', as: 'user' })


// User -> Comments (1:M)
User.hasMany(Comment, { foreignKey: 'userId', as: 'comments', onDelete: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: 'userId', as: 'user' })



// Post -> Likes (1:M)
Post.hasMany(Like, { foreignKey: 'postId', as: 'likes', onDelete: 'CASCADE' })
Like.belongsTo(Post, { foreignKey: 'postId', as: 'post' })

// Post -> Comments (1:M)
Post.hasMany(Comment, { foreignKey: 'postId', as: 'comments', onDelete: 'CASCADE' })
Comment.belongsTo(Post, { foreignKey: 'postId', as: 'post' })



// Comment -> Likes (1:M)
Comment.hasMany(Like, { foreignKey: 'commentId', as:'likes', onDelete: 'CASCADE' })
Like.belongsTo(Comment, { foreignKey: 'commentId', as: 'comments' })

// Comment -> Comment (1:M)
Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'replies', onDelete: 'CASCADE' })
Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parent' })


export { User, Post, Comment, Like, UserSettings }

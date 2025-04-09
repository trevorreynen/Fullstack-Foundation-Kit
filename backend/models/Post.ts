// ./backend/models/Post.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize'
import { sequelize } from '../config/database'

import User from './User'
import Like from './Like'
import Comment from './Comment'


class Post extends Model<InferAttributes<Post>, InferCreationAttributes<Post>> {
  declare id: CreationOptional<number>
  declare userId: ForeignKey<User['id']>
  declare title: string
  declare content: string
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}


Post.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: 'Post',
    tableName: 'Posts',
    timestamps: true,
  },
)


// Post likes.
Post.hasMany(Like, { foreignKey: 'postId', onDelete: 'CASCADE' })
Like.belongsTo(Post, { foreignKey: 'postId' })


// Post has comments.
Post.hasMany(Comment, { foreignKey: 'postId', onDelete: 'CASCADE' })
Comment.belongsTo(Post, { foreignKey: 'postId' })


export default Post

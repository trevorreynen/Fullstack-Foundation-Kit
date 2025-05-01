// ./backend/models/Comment.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize'
import { sequelize } from '../config/database'

import { User, Post } from '../models'


class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<number>
  declare userId: ForeignKey<User['id']>
  declare postId: ForeignKey<Post['id']>
  declare content: string
  declare parentCommentId: number | null
  declare createdAt: CreationOptional<Date>
  declare updatedAt: CreationOptional<Date>
}


Comment.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true
    },
    userId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    parentCommentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'Comments',
    timestamps: true
  }
)


export default Comment

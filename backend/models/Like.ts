// ./backend/models/Like.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional, Optional } from 'sequelize'
import { sequelize } from '../config/database'

import { User, Post, Comment } from '../models'


class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreationOptional<number>
  declare userId: ForeignKey<User['id']>
  declare postId: ForeignKey<Post['id']> | null
  declare commentId: ForeignKey<Comment['id']> | null
}


Like.init(
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
      allowNull: true
    },
    commentId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ['userId', 'postId']
      },
      {
        unique: true,
        fields: ['userId', 'commentId']
      }
    ]
  }
)


export default Like

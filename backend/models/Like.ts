// ./backend/models/Like.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, ForeignKey, CreationOptional } from 'sequelize'
import { sequelize } from '../config/database'

import User from './User'
import Post from './Post'


class Like extends Model<InferAttributes<Like>, InferCreationAttributes<Like>> {
  declare id: CreationOptional<number>
  declare userId: ForeignKey<User['id']>
  declare postId: ForeignKey<Post['id']>
}


Like.init(
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
    postId: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Like',
    tableName: 'Likes',
    timestamps: true,
  },
)


export default Like


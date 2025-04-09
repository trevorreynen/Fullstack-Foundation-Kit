// ./backend/models/User.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '../config/database'
import bcrypt from 'bcrypt'

import UserSettings from './UserSettings'
import Post from './Post'
import Like from './Like'
import Comment from './Comment'


class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>
  declare username: string
  declare email: string
  declare password: string
  declare profileIconUrl: CreationOptional<string | null>

  // Utility method to compare passwords.
  async checkPassword(inputPassword: string): Promise<boolean> {
    return bcrypt.compare(inputPassword, this.password)
  }
}


User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,                   // Must be unique between all users. Only one usename. Allows for a better system if I add in @tagging.
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,                   // Must be unique between all users. Only one email per person (ideally) to prevent people making multiple accounts easily.
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profileIconUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true,
  },
)


// Hash password before saving to DB
User.beforeCreate(async (user) => {
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})

User.beforeUpdate(async (user) => {
  if (user.changed('password')) {
    user.password = await bcrypt.hash(user.password, 10)
  }
})


// User settings.
User.hasOne(UserSettings, {
  foreignKey: 'userId',
  as: 'settings',
  onDelete: 'CASCADE',
})
UserSettings.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})


// User posts.
User.hasMany(Post, {
  foreignKey: 'userId',
  as: 'posts',
  onDelete: 'CASCADE',
})

Post.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user',
})


// User likes.
User.hasMany(Like, { foreignKey: 'userId', onDelete: 'CASCADE' })
Like.belongsTo(User, { foreignKey: 'userId' })


// User comments.
User.hasMany(Comment, { foreignKey: 'userId', onDelete: 'CASCADE' })
Comment.belongsTo(User, { foreignKey: 'userId' })


export default User

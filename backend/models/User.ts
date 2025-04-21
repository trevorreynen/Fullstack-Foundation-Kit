// ./backend/models/User.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from 'sequelize'
import { sequelize } from '../config/database'
import bcrypt from 'bcrypt'


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
      defaultValue: '/uploads/default-profile-icon.png',
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


export default User

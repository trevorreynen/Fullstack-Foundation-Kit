// ./backend/models/UserSettings.ts

// Imports
import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey } from 'sequelize'
import { sequelize } from '../config/database'

import User from './User'


class UserSettings extends Model<InferAttributes<UserSettings>, InferCreationAttributes<UserSettings>> {
  declare id: CreationOptional<number>
  declare userId: ForeignKey<User['id']>
  declare uiTheme: CreationOptional<'light' | 'dark'>
  declare customNote: CreationOptional<string | null>
  declare notificationsEnabled: CreationOptional<boolean>
}


UserSettings.init(
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
    uiTheme: {
      type: DataTypes.ENUM('light', 'dark'),
      allowNull: false,
      defaultValue: 'dark',
    },
    customNote: {
      type: DataTypes.STRING(500),
      allowNull: true,
      defaultValue: null,
    },
    notificationsEnabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  },
  {
    sequelize,
    modelName: 'UserSettings',
    tableName: 'UserSettings',
    timestamps: true,
  },
)


export default UserSettings

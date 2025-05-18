// ./backend/migrations/20250506182110-create-user-settings.js

'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('UserSettings', {
      id: {
        type: Sequelize.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
      },
      uiTheme: {
        type: Sequelize.ENUM('light', 'dark'),
        allowNull: false,
        defaultValue: 'dark',
      },
      customNote: {
        type: Sequelize.STRING(500),
        allowNull: true,
        defaultValue: null,
      },
      notificationsEnabled: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true,
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('UserSettings')
  }
}

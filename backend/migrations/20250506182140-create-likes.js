// ./backend/migrations/20250506182140-create-likes.js

'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Likes', {
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
      postId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'Posts', key: 'id' },
        onDelete: 'CASCADE',
      },
      commentId: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: true,
        references: { model: 'Comments', key: 'id' },
        onDelete: 'CASCADE',
      },
      createdAt: Sequelize.DATE,
      updatedAt: Sequelize.DATE,
    })

    // Composite Unique Constraints
    await queryInterface.addConstraint('Likes', {
      fields: ['userId', 'postId'],
      type: 'unique',
      name: 'unique_user_post_like'
    })

    await queryInterface.addConstraint('Likes', {
      fields: ['userId', 'commentId'],
      type: 'unique',
      name: 'unique_user_comment_like'
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable('Likes')
  }
}

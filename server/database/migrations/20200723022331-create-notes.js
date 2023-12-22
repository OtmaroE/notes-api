module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('note', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    folderId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'folder',
          schema: 'public',
        },
        key: 'id',
      },
      allowNull: false,
      field: 'folder_id',
    },
    userId: {
      type: Sequelize.INTEGER,
      references: {
        model: {
          tableName: 'user',
          schema: 'public',
        },
        key: 'id',
      },
      field: 'user_id',
    },
    isDeleted: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      field: 'is_deleted',
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'created_at',
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      field: 'updated_at',
    },
  }),
  down: (queryInterface) => queryInterface.dropTable('note'),
};

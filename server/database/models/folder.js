module.exports = (sequelize, DataTypes) => {
  const Folder = sequelize.define('Folder', {
    name: {
      type: DataTypes.STRING,
    },
    userId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.User,
        key: 'id',
      },
      field: 'user_id',
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      field: 'is_deleted',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: 'updated_at',
    }
  },
  {
    tableName: 'folder'
  });
  Folder.associate = () => {
    // associations can be defined here
  };
  return Folder;
};

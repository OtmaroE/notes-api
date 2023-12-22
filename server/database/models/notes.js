module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Note', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    folderId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.Folder,
        key: 'id',
      },
      field: 'folder_id',
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
    tableName: 'note'
  });
  Notes.associate = () => {
    // associations can be defined here
  };
  return Notes;
};

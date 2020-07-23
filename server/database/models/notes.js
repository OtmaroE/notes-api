module.exports = (sequelize, DataTypes) => {
  const Notes = sequelize.define('Notes', {
    name: DataTypes.STRING,
    content: DataTypes.STRING,
    folderId: {
      type: DataTypes.INTEGER,
      references: {
        model: sequelize.models.Folder,
        key: 'id',
      },
    },
    isDeleted: DataTypes.BOOLEAN,
  }, {});
  Notes.associate = () => {
    // associations can be defined here
  };
  return Notes;
};

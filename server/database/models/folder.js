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
    },
    isDeleted: DataTypes.BOOLEAN,
  }, {});
  Folder.associate = () => {
    // associations can be defined here
  };
  return Folder;
};

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userName: {
      type: DataTypes.STRING,
      field: 'user_name',
    },
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isDeleted: {
      type: DataTypes.BOOLEAN,
      field: 'is_deleted'
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
    tableName: 'user'
  });
  User.associate = () => {
    // associations can be defined here
  };
  return User;
};

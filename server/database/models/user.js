const Sequelize = require('sequelize');

const int = Sequelize.INTEGER;
const string = Sequelize.STRING;
const bool = Sequelize.BOOLEAN;

class User extends Model {}

User.init({
  id: { type: int, primaryKey: true, autoIncrement: true },
  name: { type: string },
  email: { type: string },
  password: { type: string },
  isDeleted: { type: bool, field: 'is_deleted' },
  roleId: 'todo: this should be a foreign key to roles',
});

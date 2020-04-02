const Sequelize = require('sequelize');

const int = Sequelize.INTEGER;
const string = Sequelize.STRING;
const bool = Sequelize.BOOLEAN;

class Folder extends Model {}

Folder.init({
  id: { type: int, primaryKey: true, autoIncrement: true },
  name: { type: string },
  description: { type: string },
  isDeleted: { type: bool, field: 'is_deleted' },
  userId: 'todo: this should be a reference to the owner user',
});

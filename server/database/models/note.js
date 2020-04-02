const Sequelize = require('sequelize');

const int = Sequelize.INTEGER;
const string = Sequelize.STRING;
const bool = Sequelize.BOOLEAN;
const text = Sequelize.TEXT;

class Note extends Model {}

Note.init({
  id: { type: int, primaryKey: true, autoIncrement: true },
  name: { type: string },
  description: { type: string },
  data: { type: text },
  isDeleted: { type: bool, field: 'is_deleted' },
  folderId: 'todo: this should be a foreign key constraint to folder',
});

const Sequelize = require('sequelize');

const int = Sequelize.INTEGER;
const string = Sequelize.STRING;
const bool = Sequelize.BOOLEAN;
const intArray = Sequelize.ARRAY(int);

class Role extends Model {}

Role.init({
  id: { type: int, primaryKey: true, autoIncrement: true },
  name: { type: string },
  permissions: { type: intArray },
  sDeleted: { type: bool, field: 'is_deleted' },
});

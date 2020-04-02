const Sequilize = require('sequilize');
const DATABASE_NAME = process.env.DATABASE_NAME || 'postgres';
const DATABASE_USERNAME = process.env.DATABASE_USERNAME || 'postgres';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD || 'postgres';
const DATABASE_HOST = process.env.DATABASE_HOST || 'localhost';
const DATABASE_DIALECT = process.env.DATABASE_DIALECT || 'postgres';

const sequilize = new Sequelize(DATABASE_NAME, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  dialect: DATABASE_DIALECT,
});

sequilize
  .authenticate()
  .then(() => console.info('Postgres connection established successfully'))
  .catch(() => console.error('Unable to connect to the database'));
module.exports = sequilize;

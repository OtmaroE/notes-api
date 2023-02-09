module.exports = {
  development: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: 'postgres',
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres',
  },
};

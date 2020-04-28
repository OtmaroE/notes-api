module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    userName: 'demo',
    email: 'demo@demo.com',
    password: 'demo',
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

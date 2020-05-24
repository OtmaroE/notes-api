module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Users', [{
    userName: 'demo',
    email: 'demo@demo.com',
    password: '$2a$10$HH2V8uDs3C5Ty2UutXFZM.lG7wP3RxKK.ulwYczBB9Q.guSsjkeXi', // 12345678
    isDeleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

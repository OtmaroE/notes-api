module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('user', [{
    id: 1,
    'user_name': 'demo',
    email: 'demo@demo.com',
    password: '$2a$10$HH2V8uDs3C5Ty2UutXFZM.lG7wP3RxKK.ulwYczBB9Q.guSsjkeXi', // 12345678
    'is_deleted': false,
    'created_at': new Date(),
    'updated_at': new Date(),
  }]),
  down: (queryInterface) => queryInterface.bulkDelete('Users', null, {}),
};

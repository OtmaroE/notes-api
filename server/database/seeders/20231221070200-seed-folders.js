module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('folder', [
    {
      id: 1,
      name: 'test 1',
      'user_id': 1,
      'is_deleted': false,
      'created_at': new Date(),
      'updated_at': new Date(),
    },
    {
      id: 2,
      name: 'test 2',
      'user_id': 1,
      'is_deleted': false,
      'created_at': new Date(),
      'updated_at': new Date(),
    },
    {
      id: 3,
      name: 'test 3',
      'user_id': 1,
      'is_deleted': false,
      'created_at': new Date(),
      'updated_at': new Date(),
    },
    {
      id: 4,
      name: 'test 4',
      'user_id': 1,
      'is_deleted': false,
      'created_at': new Date(),
      'updated_at': new Date(),
    },
    {
      id: 5,
      name: 'test 5',
      'user_id': 1,
      'is_deleted': false,
      'created_at': new Date(),
      'updated_at': new Date(),
    }
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('folder', null, {}),
};

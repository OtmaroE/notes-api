module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('folder', [
    {
      name: 'test 1',
      user_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'test 2',
      user_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'test 3',
      user_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'test 4',
      user_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
    {
      name: 'test 5',
      user_id: 1,
      is_deleted: false,
      created_at: new Date(),
      updated_at: new Date(),
    },
  ]),
  down: (queryInterface) => queryInterface.bulkDelete('folder', null, {}),
};

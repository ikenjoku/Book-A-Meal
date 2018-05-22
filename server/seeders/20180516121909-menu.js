module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Menus', [
      {
        date: '2018-05-10',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '2018-05-15',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '2018-05-20',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Menus', null, {});
  },
};

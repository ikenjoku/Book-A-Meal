module.exports = {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('Orders', [
      {
        date: '2018-05-16',
        amount: 1100,
        userId: 1,
        mealId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '2018-05-16',
        amount: 1500,
        userId: 1,
        mealId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '2018-05-16',
        amount: 1200,
        userId: 2,
        mealId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        date: '2018-05-16',
        amount: 1500,
        userId: 3,
        mealId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('Orders', null, {});
  },
};

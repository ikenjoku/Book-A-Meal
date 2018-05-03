module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('JoinTable', {
    MenuId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Menus',
        key: 'id',
      },
    },

    MealId: {
      type: Sequelize.INTEGER,
      references: {
        model: 'Meals',
        key: 'id',
      },
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('JoinTable'),
};

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('MealMenus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      mealid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      menuid: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface) => {
    return queryInterface.dropTable('MealMenus');
  },
};

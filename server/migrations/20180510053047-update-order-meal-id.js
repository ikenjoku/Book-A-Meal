module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn('Order', 'mealId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0
    })
  },
  down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Order', 'mealId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null
    })
    }
  }
};

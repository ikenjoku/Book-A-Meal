module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.addColumn('Order', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    });
  },
  down(queryInterface, Sequelize) {
    queryInterface.removeColumn('Order', 'userId', {
      type: Sequelize.INTEGER,
      allowNull: true,
      defaultValue: null,
    });
  },
};


module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    amount: DataTypes.INTEGER,
    date: DataTypes.DATE,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
      onDelete: 'CASCADE',
    });
  };

  return Order;
};

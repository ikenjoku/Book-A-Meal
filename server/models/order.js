module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'customerId',
      targetKey: 'id',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealid',
      // otherKey: 'MealId',
    });

  };
  return Order;
};

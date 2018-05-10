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
      foreignKey: 'UserId',
      targetKey: 'id',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'OrderId',
      otherKey: 'MealId',
    });
  };
  return Order;
};

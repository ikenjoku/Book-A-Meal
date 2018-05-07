
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    amount: DataTypes.DECIMAL(10, 2),
    date: DataTypes.DATEONLY,
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.hasMany(models.Meal);
  };

  return Order;
};

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
    userId: {
      type: DataTypes.INTEGER,
      // onDelete: 'CASCADE',
      allowNull: false,
      // references: {
      //   model: 'Users',
      //   key: 'id',
      //   as: 'userId',
      // },
    },
    mealId: {
      type: DataTypes.INTEGER,
      // onDelete: 'CASCADE',
      allowNull: true,
      // references: {
      //   model: 'Meals',
      //   key: 'id',
      //   as: 'mealId',
      // },
    },
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
    });
    Order.belongsTo(models.Meal, {
      foreignKey: 'mealId',
    });
  };
  return Order;
};

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    imgurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Meal.associate = (models) => {
    Meal.hasMany(models.Menu, {
      foreignKey: 'mealId',
      as: 'menuId',
    });
  };
  return Meal;
};

module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.STRING,
    },
    imgurl: {
      type: DataTypes.STRING,
    },
  });
  Meal.associate = (models) => {
    Meal.belongsToMany(models.Menu, {
      through: 'MealMenus',
      onDelete: 'CASCADE',
    });
    Meal.hasMany(models.Order, {
      foreignKey: 'mealId',
      as: 'Meals',
    });
  };
  return Meal;
};

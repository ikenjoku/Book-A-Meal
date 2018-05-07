
module.exports = (sequelize, DataTypes) => {
  const Meal = sequelize.define('Meal', {
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10, 2),
    imgurl: DataTypes.STRING,
  });

  Meal.associate = (models) => {
    // associations can be defined here
    Meal.belongsToMany(models.Menu, { through: 'MealMenu' });
  };
  return Meal;
};

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
    category: {
      type: DataTypes.ENUM,
      values: ['combo', 'assorted', 'soup', 'drinks'],
    },
    imgurl: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  Meal.associate = (models) => {
    Meal.belongsToMany(models.Menu, {
      through: 'JoinTable',
      foreignKey: 'mealId',
    });
  };
  return Meal;
};

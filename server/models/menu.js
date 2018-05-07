
module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
  Menu.associate = (models) => {
    // associations can be defined here
    Menu.belongsToMany(models.Meal, { through: 'MealMenu' });
  };
  return Menu;
};

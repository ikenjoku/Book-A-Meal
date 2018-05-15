module.exports = (sequelize, DataTypes) => {
  const MealMenu = sequelize.define('MealMenu', {
    mealid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    menuid: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
      },
    },
  });
  return MealMenu;
};

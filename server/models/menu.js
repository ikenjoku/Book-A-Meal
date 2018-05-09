module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.STRING,
    },
    orderBy: {
      type: DataTypes.INTEGER,
    },
  });
  Menu.associate = (models) => {
    Menu.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    Menu.belongsToMany(models.Meal, {
      through: 'MealMenus',
      onDelete: 'CASCADE',
    });
  };

  return Menu;
};
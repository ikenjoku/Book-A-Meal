module.exports = (sequelize, DataTypes) => {
  const Menu = sequelize.define('Menu', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
  });
  Menu.associate = (models) => {
    Menu.hasMany(models.Meal, {
      through: models.JoinTable,
      foreignKey: 'menuId',
    });
  };
  return Menu;
};

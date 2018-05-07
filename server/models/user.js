import { hashPassword } from '../helpers/helpers';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: 'Email is invalid',
        },
      },
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  });

  User.beforeCreate(user => hashPassword(user), { individualHooks: true });

  User.associate = (models) => {
    User.hasMany(models.Order);
  };

  return User;
};

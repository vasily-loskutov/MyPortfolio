const { Model, DataTypes } = require("sequelize");

const sequelize = require("../db");
class Info extends Model {}
Info.init(
  {
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    frontendSkills: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    backendSkills: {
      allowNull: false,
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Info",
    tableName: "Info",
  }
);

module.exports = Info;

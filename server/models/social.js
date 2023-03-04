const { Model, DataTypes } = require("sequelize");

const sequelize = require("../db");
class Social extends Model {}
Social.init(
  {
    filename: DataTypes.STRING,
    linkSocial: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Social",
    tableName: "Social",
  }
);
module.exports = Social;

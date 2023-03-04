const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = require("../db");
class ProjectInfo extends Model {}

ProjectInfo.init(
  {
    path: DataTypes.STRING,
    link: DataTypes.STRING,
    name: DataTypes.STRING,
    skills: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "ProjectInfo",
    tableName: "ProjectInfo",
  }
);
module.exports = ProjectInfo;

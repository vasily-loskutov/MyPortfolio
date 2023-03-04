const Sequelize = require("sequelize");

const sequelize = new Sequelize("portfolioDB", "postgres", "Wasa2083", {
  host: "localhost",
  dialect: "postgres",
});

module.exports = sequelize;

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "postgres",
  storage: ":memory:",
  username: "postgres",
  password: "1234",
  logging: false,
});

module.exports = sequelize;

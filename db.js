const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();
const sequelize = new Sequelize(
  `${process.env.DATABASE}`,
  `${process.env.DB_USERNAME}`,
  `${process.env.DB_PASSWORD}`,
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const dbCon = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection successful!");
  } catch (err) {
    console.error("DB connection error", err);
  }
};

module.exports = { sq: sequelize, dbCon };

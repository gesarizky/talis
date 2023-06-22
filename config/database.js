import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const DATABASE = process.env.DATABASE;
const DATABASE_USERNAME = process.env.DATABASE_USERNAME;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const DATABASE_HOST = process.env.DATABASE_HOST;
const DATABASE_PORT = process.env.DATABASE_PORT;
const DATABASE_TYPE = process.env.DATABASE_TYPE;
const DATABASE_LOGGING = process.env.DATABSE_LOGGING;

const DB = new Sequelize(DATABASE, DATABASE_USERNAME, DATABASE_PASSWORD, {
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialect: DATABASE_TYPE,
  logging: DATABASE_LOGGING,
  timezone: "+07:00",
});

export default DB;

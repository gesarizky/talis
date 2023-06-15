import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();


const DATABASE_PARAM = process.env.DATABASE_PARAM;
const DATABASE_USERNAME_PARAM = process.env.DATABASE_USERNAME_PARAM;
const DATABASE_PASSWORD_PARAM = process.env.DATABASE_PASSWORD_PARAM;
const DATABASE_HOST_PARAM = process.env.DATABASE_HOST_PARAM;
const DATABASE_PORT_PARAM = process.env.DATABASE_PORT_PARAM;
const DATABASE_TYPE_PARAM = process.env.DATABASE_TYPE_PARAM;
const DATABASE_LOGGING_PARAM = process.env.DATABSE_LOGGING_PARAM;

const db = new Sequelize(DATABASE_PARAM,DATABASE_USERNAME_PARAM,DATABASE_PASSWORD_PARAM,{
    host: DATABASE_HOST_PARAM,
    port:DATABASE_PORT_PARAM,
    dialect: DATABASE_TYPE_PARAM,
    logging: DATABASE_LOGGING_PARAM,
    timezone:'+07:00'
});

export default db;
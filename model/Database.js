import { Sequelize } from "sequelize";
import db from "../config/database";

const { DataTypes } = Sequelize;

const DataBase = db.define("kalidua", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  nilai: DataTypes.STRING,
});

export default DataBase;

(async () => {
  // await db.sync({ alter: true });
  await db.sync();
})();

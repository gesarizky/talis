import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";


const { DataTypes } = Sequelize;

const HistoryInverter = DB.define(
  "history_inverter",
  {
    UUID_User: DataTypes.STRING,
    data: DataTypes.JSON,
  },
  {
    paranoid: true,
  }
);

export default HistoryInverter;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

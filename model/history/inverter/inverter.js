import { DataTypes } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const HistoryInverter = DB.define("history_inverter", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  inverter_sn: DataTypes.STRING,
  data: DataTypes.JSON,
  timestamp: DataTypes.DATE,
});

export default HistoryInverter;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

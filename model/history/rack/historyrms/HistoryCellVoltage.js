import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryCellVoltage = DB.define("history_Cellvoltage", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  rms_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  voltage: DataTypes.JSON,
});

export default HistoryCellVoltage;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

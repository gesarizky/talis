import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel history vell voltage
 */

const HistoryCellVoltage = DB.define("history_Cellvoltage", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  rms_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  voltage: DataTypes.JSON,
  timestamp: DataTypes.DATE,
});

export default HistoryCellVoltage;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

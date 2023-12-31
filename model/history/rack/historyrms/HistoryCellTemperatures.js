import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel history cell temperature
 */

const HistoryCellTempe = DB.define("history_Celltemperature", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  rms_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  temperatures: DataTypes.JSON,
  timestamp: DataTypes.DATE,
});

export default HistoryCellTempe;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

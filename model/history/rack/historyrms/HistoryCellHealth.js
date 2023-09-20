import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel history cell health
 */

const HistoryCellHealth = DB.define("history_Cellhealth", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  rms_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  health: DataTypes.JSON,
  timestamp: DataTypes.DATE,
});

export default HistoryCellHealth;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

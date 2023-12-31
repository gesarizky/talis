import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel history cell content
 */

const HistoryCellContent = DB.define("history_Cellcontent", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  rms_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  content: DataTypes.JSON,
  timestamp: DataTypes.DATE,
});

export default HistoryCellContent;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

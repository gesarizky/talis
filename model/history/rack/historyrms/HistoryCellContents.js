import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryCellContent = DB.define("history_Cellcontent", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  rms_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  content: DataTypes.JSON,
});

export default HistoryCellContent;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryCellContent = DB.define("history_Cellcontent", {
  frame_name: DataTypes.STRING,
  content: DataTypes.JSON,
});

export default HistoryCellContent;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

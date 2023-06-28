import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryCellHealth = DB.define("history_Cellhealth", {
  frame_name: DataTypes.STRING,
  health: DataTypes.JSON,
});

export default HistoryCellHealth;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryRack = DB.define("history_cell", {
  UUID_User: DataTypes.STRING,
  data: DataTypes.JSON,
});

export default HistoryRack;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

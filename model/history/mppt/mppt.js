import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryMppt = DB.define("history_mppt", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  mppt_sn: DataTypes.STRING,
  group: DataTypes.INTEGER,
  module: DataTypes.INTEGER,
  data: DataTypes.JSON,
});

export default HistoryMppt;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

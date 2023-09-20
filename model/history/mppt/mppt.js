import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel history mppt
 */

const HistoryMppt = DB.define("history_mppt", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  mppt_sn: DataTypes.STRING,
  group: DataTypes.INTEGER,
  module: DataTypes.INTEGER,
  data: DataTypes.JSON,
  timestamp: DataTypes.DATE,
});

export default HistoryMppt;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryCellTempe = DB.define("history_Celltemperature", {
  UUID_User: DataTypes.STRING,
  rack_sn: DataTypes.STRING,
  frame_name: DataTypes.STRING,
  temperatures: DataTypes.JSON,
});

export default HistoryCellTempe;

(async () => {
  await DB.sync({ alter: true });
  // await DB.sync();
})();

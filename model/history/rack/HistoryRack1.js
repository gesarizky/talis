import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const HistoryRack1 = DB.define("history_cell1", {
  UUID_User: DataTypes.STRING,
  data_rack: DataTypes.JSON,
  cell_content: DataTypes.JSON,
  cell_health: DataTypes.JSON,
  cell_voltage: DataTypes.JSON,
  cell_temperature: DataTypes.JSON,
});

export default HistoryRack1;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

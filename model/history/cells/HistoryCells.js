import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";

const { DataTypes } = Sequelize;

const HistoryCells = DBHISTORY.define("history_cell", {
  UUID_User: DataTypes.STRING,
  frame_name: {
    unique: "frame_name",
    type: DataTypes.STRING,
  },
  data: DataTypes.JSON,
});

export default HistoryCells;

(async () => {
  // await DBHISTORY.sync({ alter: true });
  await DBHISTORY.sync();
})();
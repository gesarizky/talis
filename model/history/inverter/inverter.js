import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";

const { DataTypes } = Sequelize;

const HistoryInverter = DBHISTORY.define(
  "history_inverter",
  {
    UUID_User: DataTypes.STRING,
    data: DataTypes.JSON,
  },
  {
    paranoid: true,
  }
);

export default HistoryInverter;

(async () => {
  await DBHISTORY.sync({ alter: true });
  // await DBHISTORY.sync();
})();

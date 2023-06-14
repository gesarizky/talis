import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";

const { DataTypes } = Sequelize;

const HistoryInverter = DBHISTORY.define(
  "history_inverter",
  {
    inverter_sn: DataTypes.STRING,
    mode: DataTypes.STRING,
    power: DataTypes.FLOAT,
    energy: DataTypes.FLOAT,
    status: DataTypes.STRING,
    code: DataTypes.JSON,
    UUID_User: {
      unique: "UUID_User",
      type: DataTypes.STRING,
    },
  },
  {
    paranoid: true,
  }
);

export default HistoryInverter;

(async () => {
  // await DBHISTORY.sync({ alter: true });
  await DBHISTORY.sync();
})();

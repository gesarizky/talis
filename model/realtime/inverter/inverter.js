import { Sequelize } from "sequelize";
import DBREALTIME from "@/config/realtime/DBRealtime";

const { DataTypes } = Sequelize;

const RealtimeInverter = DBREALTIME.define(
  "realtime_inverter",
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

export default RealtimeInverter;

(async () => {
    // await DBREALTIME.sync({ alter: true });
  await DBREALTIME.sync();
})();

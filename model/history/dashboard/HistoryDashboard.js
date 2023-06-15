import { Sequelize } from "sequelize";
import DBHISTORY from "@/config/history/DBHistory";

const { DataTypes } = Sequelize;

const HistoryDashboard = DBHISTORY.define("history_dashboard", {
  UUID_User: {
    unique: "UUID_User",
    type: DataTypes.STRING,
  },
  rack_sn: DataTypes.STRING,
  data: DataTypes.JSON,
});

export default HistoryDashboard;

(async () => {
  // await DBHISTORY.sync({ alter: true });
  await DBHISTORY.sync();
})();

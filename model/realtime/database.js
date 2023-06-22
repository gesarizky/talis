
import { Sequelize } from "sequelize";
import DBREALTIME from "@/config/realtime/DBRealtime";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const RealtimeDb = DB.define("realtime", {
  UUID_User: {
    unique: "UUID_User",
    type: DataTypes.STRING,
  },
  data: DataTypes.JSON,
});

export default RealtimeDb;

(async () => {
//   await DBREALTIME.sync({alter:true});
  await DB.sync();
})();

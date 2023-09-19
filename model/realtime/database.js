import { DataTypes } from "sequelize";
import DBREALTIME from "@/config/realtime/DBRealtime";
import DB from "@/config/database";

const RealtimeDb = DB.define("realtime", {
  rms_sn: {
    unique: "UUID_User",
    type: DataTypes.STRING,
  },
  rack_sn: DataTypes.STRING,
  UUID_User: DataTypes.STRING,
  health: DataTypes.FLOAT,
  content: DataTypes.FLOAT,
});

export default RealtimeDb;

(async () => {
  //   await DB.sync({alter:true});
  await DB.sync();
})();

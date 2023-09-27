import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel realtime rack
 */

const RealtimeRack = DB.define("realtime_rack", {
  rack_sn: {
    unique: "rack_sn",
    type: DataTypes.STRING,
  },
  data: DataTypes.JSON,
});

export default RealtimeRack;

(async () => {
  //   await DB.sync({alter:true});
  await DB.sync();
})();

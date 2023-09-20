import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel parameter setting
 */

const ParamSetting = DB.define("paramsetting", {
  device_sn: {
    type: DataTypes.STRING,
    unique: "device_sn",
  },
  config: DataTypes.JSON,
  note: DataTypes.TEXT,
});

export default ParamSetting;

(async () => {
  // await DB.sync({alter:true});
  await DB.sync();
})();


import { Sequelize } from "sequelize";
import db from "@/config/param/Database";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

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

// "use strict";
import { Sequelize } from "sequelize";
import db from "@/config/param/Database";

const { DataTypes } = Sequelize;

const ParamSetting = db.define("paramsetting", {
  device_sn: {
    type: DataTypes.STRING,
    unique: 'device_sn',
  },
  config: DataTypes.JSON,
  note: DataTypes.TEXT,
});

export default ParamSetting;

(async () => {
  // await db.sync({alter:true});
  await db.sync();
})();

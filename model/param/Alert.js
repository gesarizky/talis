// "use strict";
import { Sequelize } from "sequelize";
import db from "@/config/param/Database";
import DB from "@/config/database";

const { DataTypes } = Sequelize;

const AlertDb = DB.define("alert", {
  UUID_User: DataTypes.STRING,
  data: DataTypes.STRING,
});

export default AlertDb;

(async () => {
  // await DB.sync({alter:true});
  await DB.sync();
})();

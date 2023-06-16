// "use strict";
import { Sequelize } from "sequelize";
import db from "@/config/param/Database";

const { DataTypes } = Sequelize;

const AlertDb = db.define("alert", {
  UUID_User: DataTypes.STRING,
  data: DataTypes.STRING,
});

export default AlertDb;

(async () => {
  // await db.sync({alter:true});
  await db.sync();
})();

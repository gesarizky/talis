import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel param alert
 */

const AlertDb = DB.define("alert", {
  UUID_User: DataTypes.STRING,
  data: DataTypes.STRING,
});

export default AlertDb;

(async () => {
  // await DB.sync({alter:true});
  await DB.sync();
})();

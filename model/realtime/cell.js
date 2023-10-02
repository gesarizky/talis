import { DataTypes } from "sequelize";
import DB from "@/config/database";

/**
 * @description tabel realtime cell
 */

const RealtimeCells = DB.define("realtime_cell", {
  frame_name: {
    unique: true,
    type: DataTypes.STRING,
  },
  data: DataTypes.JSON,
});

export default RealtimeCells;

(async () => {
  // await DB.sync({ alter: true });
  await DB.sync();
})();

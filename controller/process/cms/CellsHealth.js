import ModelParam from "@/model/access/param/ModelParam";

/**
 * @description olah data menghasilkan health
 * @param {Number} dataVcell data raw vcell
 * @param {Object} modelParam data config parameter
 * @returns health frame
 */

const CellsHealth = (dataVcell, modelParam) => {
  try {
    const configModelParam = new ModelParam(modelParam);
    const maxVcell = Math.max(...dataVcell);
    const Health = dataVcell.map((value) => {
      const rawHealth =
        configModelParam.capacityNew / configModelParam.capacityNow -
        (maxVcell - value) / configModelParam.maximumDifferentCell;
      const dataHealth =
        rawHealth > 0 ? parseFloat((rawHealth * 100).toFixed(1)) : 0; // if raw health > 0, x with percent, if not, set 0

      return dataHealth;
    });

    const result = Health;

    return result;
  } catch (error) {
    console.log("error : ~ file CellsHealth.js : ", error);
  }
};

export default CellsHealth;

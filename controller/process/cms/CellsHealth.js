import ModelParam from "@/model/access/param/ModelParam";

const CellsHealth = (dataVcell, modelParam) => {
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

  const result =  Health ;

  return result;
};

export default CellsHealth;


import ModelParam from "@/model/access/param/ModelParam";

const CellsContent = (dataVcell, modelParam) => {
  const configModelParam = new ModelParam(modelParam);
  const Content = dataVcell.map((value) => {
    const rangeContent =
      configModelParam.maximumCellVoltage - configModelParam.minimumCellVoltage;

    const extractValue =
      value > configModelParam.minimumCellVoltage
        ? value - configModelParam.minimumCellVoltage
        : 0;

    const dataContent = parseFloat(
      ((extractValue / rangeContent) * 100).toFixed(1)
    );

    return dataContent;
  });

  const result =  Content ;

  return result;
};

export default CellsContent;

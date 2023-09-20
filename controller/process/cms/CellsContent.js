import ModelParam from "@/model/access/param/ModelParam";

/**
 * @description olah data menghasilkan content
 * @param {Number} dataVcell data raw vcell
 * @param {Object} modelParam data config parameter
 * @returns content frame
 */

const CellsContent = (dataVcell, modelParam) => {
  try {
    const configModelParam = new ModelParam(modelParam);
    const Content = dataVcell.map((value) => {
      const rangeContent =
        configModelParam.maximumCellVoltage -
        configModelParam.minimumCellVoltage;

      const extractValue =
        value > configModelParam.minimumCellVoltage
          ? value - configModelParam.minimumCellVoltage
          : 0;

      const dataContent = parseFloat(
        ((extractValue / rangeContent) * 100).toFixed(1)
      );

      return dataContent;
    });

    const result = Content;

    return result;
  } catch (error) {
    console.log("error : ~ file CellsContent.js :", error);
  }
};

export default CellsContent;

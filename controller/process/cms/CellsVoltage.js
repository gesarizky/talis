/**
 * @description olah data menghasilkan voltage
 * @param {Number} dataVcell data raw vcell
 * @param {Object} modelParam data config parameter
 * @returns voltage frame
 */

const CellsVoltage = (dataVcell) => {
  try {
    const Voltage = dataVcell.map((value) => {
      return parseFloat((value / 1000).toFixed(2));
    });

    const result = Voltage;
    return result;
  } catch (error) {
    console.log("error : ~ file CellsVoltage.js : ", error);
  }
};

export default CellsVoltage;

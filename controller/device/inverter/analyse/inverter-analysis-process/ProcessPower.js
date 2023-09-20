/**
 * @description mengolah data raw menjadi data power
 * @param {Object} datainverter data raw inverter
 * @returns data power
 */

const ResultPower = async (datainverter) => {
  try {
    const datasystemdcma = datainverter.system_dc_side_total_current_ma;
    const datasystemdcmv = datainverter.system_dc_side_voltage_mv;
    const datapower =
      ((datasystemdcma / 1000) * (datasystemdcmv / 1000)) / 1000;
    return datapower;
  } catch (error) {
    console.error("error : ~ file ProcessPower.js : ", error);
  }
};

export default ResultPower;

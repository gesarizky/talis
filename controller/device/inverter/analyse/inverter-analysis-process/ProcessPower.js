const ResultPower = async (datainverter) => {
  try {
    const datasystemdcma = datainverter.system_dc_side_total_current_ma;
    const datasystemdcmv = datainverter.system_dc_side_voltage_mv;
    const datapower =
      ((datasystemdcma / 1000) * (datasystemdcmv / 1000)) / 1000;
    return datapower;
  } catch (error) {
    console.error(error);
    throw {
      message: error.message,
    };
  }
};

export default ResultPower;

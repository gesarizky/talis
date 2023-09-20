import HistoryCellVoltage from "@/model/history/rack/historyrms/HistoryCellVoltage";

/**
 * @description menyimpan data rms voltage ke database
 * @param {Object} result data olah untuk rms voltage
 */

const StoreHistoryVoltage = async (result) => {
  try {
    await HistoryCellVoltage.create(result);
  } catch (error) {
    console.log("error : ~ file StoreHistoryvoltage.js :".error);
  }
};

export default StoreHistoryVoltage;

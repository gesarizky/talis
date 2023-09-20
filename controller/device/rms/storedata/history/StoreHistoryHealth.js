import HistoryCellHealth from "@/model/history/rack/historyrms/HistoryCellHealth";

/**
 * @description menyimpan data rms health ke database
 * @param {Object} result data olah untuk rms health
 */

const StoreHistoryHealth = async (result) => {
  try {
    await HistoryCellHealth.create(result);
  } catch (error) {
    console.log("error : ~ file StoreHistoryHeath.js :".error);
  }
};

export default StoreHistoryHealth;

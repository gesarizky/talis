import HistoryCellTempe from "@/model/history/rack/historyrms/HistoryCellTemperatures";

/**
 * @description menyimpan data rms temperature ke database
 * @param {Object} result data olah untuk rms temperature
 */

const StoreHistoryTempe = async (result) => {
  try {
    await HistoryCellTempe.create(result);
  } catch (error) {
    console.log("error : ~ file : StoreHistoryTempe.js :".error);
  }
};

export default StoreHistoryTempe;

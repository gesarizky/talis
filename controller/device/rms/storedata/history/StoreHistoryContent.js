import HistoryCellContent from "@/model/history/rack/historyrms/HistoryCellContents";

/**
 * @description menyimpan data rms content ke database
 * @param {Object} result data olah untuk rms content 
 */

const StoreHistoryContent = async (result) => {
  try {
    await HistoryCellContent.create(result);
  } catch (error) {
    console.log("error : ~ File StoreHistoryContent.js :".error);
  }
};

export default StoreHistoryContent;

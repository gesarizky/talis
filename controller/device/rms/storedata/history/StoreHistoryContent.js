import HistoryCellContent from "@/model/history/rack/historyrms/HistoryCellContents";
const StoreHistoryContent = async (result) => {
  try {
    await HistoryCellContent.create(result);
  } catch (error) {
    console.log("error : StoreHistoryContent.js :".error);
  }
};

export default StoreHistoryContent;

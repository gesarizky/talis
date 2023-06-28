import HistoryCellContent from "@/model/history/rack/historyrms/HistoryCellContents";
const StoreHistoryContent = async (result) => {
  await HistoryCellContent.create(result);
};

export default StoreHistoryContent;

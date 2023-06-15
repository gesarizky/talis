import HistoryCells from "@/model/history/cells/HistoryCells";

const StoreHistoryCms = async (resultCmsHistory) => {
  const resultRealtimeCells = await HistoryCells.upsert(resultCmsHistory);

};

export default StoreHistoryCms;

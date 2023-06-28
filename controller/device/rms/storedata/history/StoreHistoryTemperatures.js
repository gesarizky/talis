import HistoryCellTempe from "@/model/history/rack/historyrms/HistoryCellTemperatures";
const StoreHistoryTempe = async (result) => {
  await HistoryCellTempe.create(result);
};

export default StoreHistoryTempe;

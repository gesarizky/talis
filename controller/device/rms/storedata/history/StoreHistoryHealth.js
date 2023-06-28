import HistoryCellHealth from "@/model/history/rack/historyrms/HistoryCellHealth";

const StoreHistoryHealth = async (result) => {
  await HistoryCellHealth.create(result);
};

export default StoreHistoryHealth;

import HistoryCellHealth from "@/model/history/rack/historyrms/HistoryCellHealth";

const StoreHistoryHealth = async (result) => {
  try {
    await HistoryCellHealth.create(result);
  } catch (error) {
    console.log("error : StoreHistoryHeath.js :".error);
  }
};

export default StoreHistoryHealth;

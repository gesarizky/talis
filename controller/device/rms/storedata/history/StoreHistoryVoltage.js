import HistoryCellVoltage from "@/model/history/rack/historyrms/HistoryCellVoltage";
const StoreHistoryVoltage = async (result) => {
  try {
    await HistoryCellVoltage.create(result);
  } catch (error) {
    console.log("error : StoreHistoryvoltage.js :".error);
  }
};

export default StoreHistoryVoltage;

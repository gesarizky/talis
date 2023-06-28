import HistoryCellVoltage from "@/model/history/rack/historyrms/HistoryCellVoltage";
const StoreHistoryVoltage = async (result) => {
  await HistoryCellVoltage.create(result);
};

export default StoreHistoryVoltage;

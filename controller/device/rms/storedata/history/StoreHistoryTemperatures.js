import HistoryCellTempe from "@/model/history/rack/historyrms/HistoryCellTemperatures";
const StoreHistoryTempe = async (result) => {
  try {
    await HistoryCellTempe.create(result);
  } catch (error) {
    console.log("error : StoreHistoryTempe.js :".error);
  }
};

export default StoreHistoryTempe;

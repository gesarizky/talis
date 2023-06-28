import HistoryRack from "@/model/history/rack/HistoryRack";
import HistoryRack1 from "@/model/history/rack/HistoryRack1";

const StoreHistoryCms = async (result) => {
   console.log("masuk sini storehistory");
   await HistoryRack1.create(result);

};

export default StoreHistoryCms;

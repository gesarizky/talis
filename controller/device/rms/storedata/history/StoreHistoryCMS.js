import HistoryRack from "@/model/history/rack/HistoryRack";
import HistoryRack1 from "@/model/history/rack/HistoryRack1";

const StoreHistoryCms = async (result) => {
   await HistoryRack1.create(result);

};

export default StoreHistoryCms;

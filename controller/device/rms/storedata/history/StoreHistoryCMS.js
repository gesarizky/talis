import HistoryRack from "@/model/history/rack/HistoryRack";

const StoreHistoryCms = async (result) => {
   await HistoryRack.create(result);

};

export default StoreHistoryCms;

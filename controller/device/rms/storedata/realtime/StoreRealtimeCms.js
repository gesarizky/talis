import RealtimeCells from "@/model/realtime/cell";
const StoreRealtimeCms = async (resultCmsRealtime) => {
  try {
    await RealtimeCells.upsert(resultCmsRealtime);
  } catch (error) {
    console.log("error : ~ file StoreRealtimeCms.js :".error);
  }
};

export default StoreRealtimeCms;

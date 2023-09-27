import RealtimeDb from "@/model/realtime/database";
const AddDataRealtime = async (data) => {
  try {
    await RealtimeDb.upsert(data);
  } catch (error) {
    console.log(error);
  }
};
export default AddDataRealtime;
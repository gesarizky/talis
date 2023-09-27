import RealtimeDb from "@/model/realtime/database";
import RealtimeModel from "@/model/access/realtime/RealtimeModel";

const getRealtimeDb = async () => {
  try {
    const respon = await RealtimeDb.findAll();
    const newrespon = respon.map((data) => new RealtimeModel(data));
    return newrespon;
  } catch (error) {
    console.log("error : ~ file getRealtimeDb.js : ", error);
  }
};
export default getRealtimeDb;

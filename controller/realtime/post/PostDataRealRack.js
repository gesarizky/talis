import CellRealAnalytic from "@/controller/process/cms/CellRealAnalytic";
const postRealtimeRack = async (datarms) => {
  try {
    const { data, UUID_User, timestamp } = datarms;
    // console.log("data postRealtimeRack :", data);
    await CellRealAnalytic(data);
  } catch (error) {
    console.log("error : ~ file postRealtimeRack.js : ", error.message);
  }
};

export default postRealtimeRack;

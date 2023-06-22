import AddDataRealtime from "../storedata/AadDataRealtime";
const postRealtimeData = async (data) => {
  try {
    await AddDataRealtime(data);
  } catch (error) {
    console.log(error);
  }
};

export default postRealtimeData;

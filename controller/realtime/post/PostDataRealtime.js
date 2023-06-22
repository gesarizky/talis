import AddDataRealtime from "../storedata/AadDataRealtime";
const postRealtimeData = async (data) => {
  try {
    if (data.data) {
        // console.log("ada");
        await AddDataRealtime(data);
    } else {
        // console.log("tak ada");
    }
  } catch (error) {
    console.log(error);
  }
};

export default postRealtimeData;

import AddDataRealtime from "../storedata/AadDataRealtime";
const postRealtimeData = async (datarms) => {
  try {
    const { data, UUID_User , rms_sn } = datarms;
    const { content, health, rack_sn } = data;
    // console.log("ada");
    const result = { UUID_User, content, health, rack_sn, rms_sn };
    await AddDataRealtime(result);
  } catch (error) {
    console.log("error : ~ file PostDataRealtime.js : ", error.message);
  }
};

export default postRealtimeData;

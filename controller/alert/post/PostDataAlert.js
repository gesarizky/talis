import AddDataAlert from "../storedata/AadDataalert";
const postAlertData = async (data) => {
  try {
    if (data.data) {
        // console.log("ada");
        await AddDataAlert(data);
    } else {
        // console.log("tak ada");
    }
  } catch (error) {
    console.log(error);
  }
};

export default postAlertData;

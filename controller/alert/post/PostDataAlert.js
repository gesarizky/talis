import AddDataAlert from "../storedata/AadDataalert";
const postAlertData = async (data) => {
  try {
    await AddDataAlert(data);
  } catch (error) {
    console.log(error);
  }
};

export default postAlertData;

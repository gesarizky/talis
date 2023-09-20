import AddDataAlert from "../storedata/AddDataalert";

/**
 * @description struktur ulang data alert yang akan dikirim ke database
 * @param {Object} data data alert
 */

const postAlertData = async (data) => {
  try {
    if (data.data) {
      await AddDataAlert(data);
    } else {
      console.log("error : ~ file PostDataAlert.js : data kosong");
    }
  } catch (error) {
    console.log(" error : ~ file PostDataAlert.js :", error);
  }
};

export default postAlertData;

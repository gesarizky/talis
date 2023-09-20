import AlertDb from "@/model/param/Alert";

/**
 * @description mengirim data alert ke database
 * @param {Object} data
 */

const AddDataAlert = async (data) => {
  try {
    await AlertDb.create(data);
  } catch (error) {
    console.log("error : ~ file AddDataAlert.js :", error);
  }
};
export default AddDataAlert;

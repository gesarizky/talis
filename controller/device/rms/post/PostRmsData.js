import CellAnalytic from "@/controller/process/cms/CellAnalytic";

/**
 * @description struktur ulang dan mengirim data rms untuk di analisis
 * @param {Object} dataRms data raw rms 
 */

const postRmsData = async (dataRms) => {
  try {
    const { data, UUID_User, timestamp } = dataRms;
    await CellAnalytic(data, UUID_User, timestamp);
  } catch (error) {
    console.log("error : ~ file PostRmsData.js :", error);
  }
};

export default postRmsData;

import MpptAnalysis from "../analyse/MpptAnalysis";

/**
 * @description struktur ulang dan mengirim data raw untuk dianalisis
 * @param {Object} datamppt data raw mppt
 */

const postMpptData = async (datamppt) => {
  try {
    await MpptAnalysis(datamppt);
  } catch (error) {
    console.log("error : ~ file PostRmsData.js :", error);
  }
};

export default postMpptData;

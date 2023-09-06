import MpptAnalysis from "../analyse/MpptAnalysis";
const postMpptData = async (datamppt) => {
  try {
    await MpptAnalysis(datamppt);
  } catch (error) {
    console.log("error PostRmsData :", error);
  }
};

export default postMpptData;

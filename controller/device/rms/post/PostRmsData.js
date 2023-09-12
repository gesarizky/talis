import ParseCMS from "@/controller/process/cms/CmsController";

const postRmsData = async (dataRms) => {
  try {
    const { data, UUID_User, timestamp } = dataRms;
    ParseCMS(data, UUID_User, timestamp);
  } catch (error) {
    console.log("error PostRmsData :", error);
  }
};

export default postRmsData;

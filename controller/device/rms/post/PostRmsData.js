import ParseCMS from "@/controller/process/cms/CmsController";

const postRmsData = async (data) => {
  try {
    
    let dataolah = data.data;
    const dataUser = data.UUID_User;
    ParseCMS(dataolah, dataUser);
  } catch (error) {
    console.log(error);
  }
};

export default postRmsData;

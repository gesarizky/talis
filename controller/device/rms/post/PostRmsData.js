import ParseCMS from "@/controller/process/cms/CmsController";
// import GetParam from "@/controller/param/GetParam";
const postRmsData = async (data) => {
  try {
    // const device_sn = {}; // default config
    // const dataParams = await GetParam(device_sn);
    let dataolah = data.data;
    const dataUser = data.UUID_User;
    ParseCMS(dataolah, dataUser);
  } catch (error) {
    console.log(error);
  }
};

export default postRmsData;

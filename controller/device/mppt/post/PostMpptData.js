
const postMpptData = async (data) => {
  try {
    let dataolah = data.data;
    const dataUser = data.UUID_User;
    console.log("UUID_User :", dataUser);
    console.log("Data Olah :", dataolah);
    // ParseCMS(dataolah, dataUser);
  } catch (error) {
    console.log("error PostRmsData :", error);
  }
};

export default postMpptData;

import InverterAnalysis from "../analyse/InverterAnalysis";
const postInverterData = async (data) => {
  try {
    const dataolah = data.data;
    const dataUser = data.UUID_User;
    if (dataolah.code === 200) {
      await InverterAnalysis(dataolah, dataUser);
    }
  } catch (error) {
    console.log(error);
  }
};

export default postInverterData;

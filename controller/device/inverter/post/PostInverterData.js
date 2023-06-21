import InverterAnalysis from "../analyse/InverterAnalysis";
const postInverterData = async (data) => {
  try {
    const dataolah = data.data.inverter_data[0];
    const dataUser = data.UUID_User;
    const dataRack = data.data.rack_sn;
    await InverterAnalysis(dataolah, dataUser,dataRack);
  } catch (error) {
    console.log(error);
  }
};

export default postInverterData;

import InverterAnalysis from "../analyse/InverterAnalysis";
const postInverterData = async (data) => {
  try {
    const dataolah = data.data.inverter_data[0];
    const dataUser = data.UUID_User;
    const dataRack = data.data.rack_sn;
    const dataSn = data.data.inverter_sn;
    await InverterAnalysis(dataolah, dataUser, dataRack, dataSn);
  } catch (error) {
    console.log(error);
  }
};

export default postInverterData;

import InverterAnalysis from "../analyse/InverterAnalysis";

/**
 * @description struktur ulang dan mengirim data raw untuk di analisis
 * @param {Object} dataInverter data raw inverter
 */

const postInverterData = async (dataInverter) => {
  try {
    const { UUID_User, timestamp, data } = dataInverter;
    const dataolah = dataInverter.data.inverter_data[0];
    const { rack_sn, inverter_sn } = data;
    await InverterAnalysis(
      dataolah,
      UUID_User,
      rack_sn,
      inverter_sn,
      timestamp
    );
  } catch (error) {
    console.log("error : ~ file PostInverterData.js : ", error);
  }
};

export default postInverterData;

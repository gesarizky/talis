import ResultPower from "./inverter-analysis-process/ProcessPower";
import ResultInverterStatus from "./inverter-analysis-process/ProcessInverterStatus";
import ResultEnergy from "./inverter-analysis-process/ProcessEnergy";
import StoreDataHistory from "../storedata/history/AddDataHistory";
import decimalFixed from "../../mppt/analyse/process/decimalFixed";

/**
 * @description fungsi utama untuk analisis data inverter
 * @param {Object} datainverter 
 * @param {String} dataUser 
 * @param {String} dataRack 
 * @param {String} dataSn 
 * @param {Date} timestamp 
 */

const InverterAnalysis = async (
  datainverter,
  dataUser,
  dataRack,
  dataSn,
  timestamp
) => {
  try {
    if (datainverter) {
      //perhitungan power
      const datapower = await ResultPower(datainverter);
      //perhitungan energy
      const dataenergy = await ResultEnergy(datapower);
      //inverter status
      const inverterstatus = await ResultInverterStatus(datainverter);
      const {
        newdatainverterstatus,
        newdatastatusinverter,
        newdatastatuserror,
      } = inverterstatus;

      const result = {
        UUID_User: dataUser,
        rack_sn: dataRack,
        inverter_sn: dataSn,
        timestamp: timestamp,
        data: {
          inverter_data: [
            {
              mode: newdatainverterstatus,
              power: await decimalFixed(datapower),
              status: newdatastatusinverter,
              code: newdatastatuserror,
            },
          ],
        },
      };
      await StoreDataHistory(result);
    } else {
      const result = {
        UUID_User: dataUser,
        rack_sn: dataRack,
        inverter_sn: dataSn,
        timestamp: timestamp,
        data: {
          inverter_data: [],
        },
      };
      await StoreDataHistory(result);
    }
  } catch (error) {
    console.error("error : ~ file InverterAnalysis.js : ",error);
  }
};

export default InverterAnalysis;

import ResultPower from "./inverter-analysis-process/ProcessPower";
import ResultInverterStatus from "./inverter-analysis-process/ProcessInverterStatus";
import ResultEnergy from "./inverter-analysis-process/ProcessEnergy";
import StoreDataHistory from "../storedata/history/AddDataHistory";

const InverterAnalysis = async (datainverter, dataUser, dataRack) => {
  try {
    if (datainverter) {
      const datainvertersn = datainverter.inverter_sn;
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
        data: {
          rack_sn: dataRack,
          inverter_data: [
            {
              inverter_sn: datainvertersn,
              mode: newdatainverterstatus,
              power: datapower,
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
        data: {
          rack_sn: dataRack,
          inverter_data: [],
        },
      };
      await StoreDataHistory(result);
    }
  } catch (error) {
    console.error(error);
    throw {
      message: error.message,
    };
  }
};

export default InverterAnalysis;

import ResultPower from "./inverter-analysis-process/ProcessPower";
import ResultInverterStatus from "./inverter-analysis-process/ProcessInverterStatus";
import ResultEnergy from "./inverter-analysis-process/ProcessEnergy";
import StoreDataHistory from "../storedata/history/AddDataHistory";

const InverterAnalysis = async (datainverter, dataUser) => {
  try {
    console.log(datainverter.power_module_status);
    if (datainverter.power_module_status) {
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
        inverter_sn: datainvertersn,
        mode: newdatainverterstatus,
        power: datapower,
        energy: dataenergy,
        status: newdatastatusinverter,
        code: newdatastatuserror,
      };
      await StoreDataHistory(result);

      return result;
    } else {
      console.log("data inv kosong");
      const result = {
        UUID_User: dataUser,
        inverter_sn: null,
        mode: null,
        power: null,
        energy: null,
        status: null,
        code: null,
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

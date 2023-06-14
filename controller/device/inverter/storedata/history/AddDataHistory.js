import HistoryInverter from "@/model/history/inverter/inverter";

const StoreDataHistory = async (datainverter) => {
  const dataInverterSn = datainverter.inverter_sn; //inverter_sn*
  const datamode = datainverter.mode; //mode*
  const datapower = datainverter.power; //power*
  const dataenergy = datainverter.energy; //energy*
  const datastatus = datainverter.status; //status*
  const datacode = datainverter.code; //error*
  const datauuid = datainverter.UUID_User; //uuid
  try {
    const [dataRealtimeDbInverter, created] = await HistoryInverter.upsert({
      inverter_sn: dataInverterSn,
      mode: datamode,
      power: datapower,
      energy: dataenergy,
      status: datastatus,
      code: datacode,
      UUID_User: datauuid,
    });
    if (created) {
        console.log("Data created");
      //   console.log(dataRealtimeDbInverter.dataValues);

      return {
        status: "Data created",
        message: "Data Realtime Inverter berhasil disimpan : ",
        data: dataRealtimeDbInverter.dataValues,
      };
    } else {
        console.log("Data updated");
      //   console.log(dataRealtimeDbInverter.dataValues);

      return {
        status: "Data updated",
        message: "Data Realtime Inverter berhasil disimpan : ",
        data: dataRealtimeDbInverter.dataValues,
      };
    }
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw {
      message: "Terjadi kesalahan saat menyimpan data",
      error: error.message,
    };
  }
};

export default StoreDataHistory;

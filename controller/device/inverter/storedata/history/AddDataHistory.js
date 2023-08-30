import HistoryInverter from "@/model/history/inverter/inverter";

const StoreDataHistory = async (datainverter) => {
  // const dataall = datainverter.data; //semua data
  // const datauuid = datainverter.UUID_User; //uuid
  const {data,UUID_User,rack_sn,inverter_sn} = datainverter
  try {
    await HistoryInverter.create({
      UUID_User: UUID_User,
      rack_sn:rack_sn,
      inverter_sn:inverter_sn,
      data: data,
    });
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw {
      message: "Terjadi kesalahan saat menyimpan data",
      error: error.message,
    };
  }
};

export default StoreDataHistory;

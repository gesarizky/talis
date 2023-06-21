import HistoryInverter from "@/model/history/inverter/inverter";

const StoreDataHistory = async (datainverter) => {
  const dataall = datainverter.data; //semua data
  const datauuid = datainverter.UUID_User; //uuid
  try {
    await HistoryInverter.create({
      UUID_User: datauuid,
      data: dataall,
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

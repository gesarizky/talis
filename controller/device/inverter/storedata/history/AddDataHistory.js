import HistoryInverter from "@/model/history/inverter/inverter";

const StoreDataHistory = async (datainverter) => {
  try {
    await HistoryInverter.create(datainverter);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw {
      message: "Terjadi kesalahan saat menyimpan data",
      error: error.message,
    };
  }
};

export default StoreDataHistory;

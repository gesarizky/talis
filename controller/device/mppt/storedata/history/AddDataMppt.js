import HistoryMppt from "@/model/history/mppt/mppt";

const StoreHistoryMppt = async (datamppt) => {
  try {
    await HistoryMppt.create(datamppt);
  } catch (error) {
    console.error("Terjadi kesalahan:", error);
    throw {
      message: "Terjadi kesalahan saat menyimpan data",
      error: error.message,
    };
  }
};

export default StoreHistoryMppt;

import HistoryMppt from "@/model/history/mppt/mppt";

const StoreHistoryMppt = async (datamppt) => {
  const { data, UUID_User, rack_sn, mppt_sn, connected_module,group, module } = datamppt;
  try {
    await HistoryMppt.create({
      UUID_User: UUID_User,
      rack_sn: rack_sn,
      mppt_sn: mppt_sn,
      group: group,
      module: module,
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

export default StoreHistoryMppt;

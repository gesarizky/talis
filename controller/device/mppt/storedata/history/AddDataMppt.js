import HistoryMppt from "@/model/history/mppt/mppt";

/**
 * @description menyimpan data mppt yang sudah diolah
 * @param {Object} datamppt data olah mppt 
 */

const StoreHistoryMppt = async (datamppt) => {
  try {
    await HistoryMppt.create(datamppt);
  } catch (error) {
    console.error("error : ~ file AddDataMppt.js :", error);
  }
};

export default StoreHistoryMppt;

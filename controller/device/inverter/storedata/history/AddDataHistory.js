import HistoryInverter from "@/model/history/inverter/inverter";

/**
 * @description menyimpan data inverter ke database
 * @param {Object} datainverter 
 */

const StoreDataHistory = async (datainverter) => {
  try {
    await HistoryInverter.create(datainverter);
  } catch (error) {
    console.error("error : ~ File addDataHistory.js ", error);
  }
};

export default StoreDataHistory;

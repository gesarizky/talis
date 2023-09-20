let totalKWh = 0;

/**
 * @description mengolah data power menjadi data energy
 * @param {Number} datapower data power
 * @returns data energy
 */

const ResultEnergy = async (datapower) => {
  try {
    const waktuOperasiJam = 1 / 3600; // 1 detik
    const kWh = datapower * waktuOperasiJam;
    totalKWh += kWh;
    return totalKWh;
  } catch (error) {
    console.error("error : ~ File ProcessEnergy.js :", error);
  }
};

export default ResultEnergy;

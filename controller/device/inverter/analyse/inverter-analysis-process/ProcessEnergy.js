let totalKWh = 0;
const ResultEnergy = async (datapower) => {
  try {
    const waktuOperasiJam = 1 / 3600; // 1 detik
    const kWh = (datapower * waktuOperasiJam) ;
    totalKWh += kWh;
    return totalKWh;
  } catch (error) {
    console.error(error);
    throw {
      message: error.message,
    };
  }
};

export default ResultEnergy;

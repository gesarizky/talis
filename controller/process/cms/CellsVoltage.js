

const CellsVoltage = (dataVcell) => {
  
  const Voltage = dataVcell.map((value) => {
    return parseFloat((value / 1000).toFixed(2));
  });

  const result =  Voltage ;
  return result;
};

export default CellsVoltage;

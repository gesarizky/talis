/**
 * @description analisis temperature
 * @param {Number} tempValue nilai temperature
 * @returns
 */

const getStatus = (tempValue) => {
  let color = "red";
  if (tempValue > 45000) {
  } else if (tempValue > 35000) {
    color = "yellow";
  } else {
    color = "green";
  }

  const value = Math.round(tempValue / 1000);
  return value;
};

const TempAnalytic = (arrayOfTemp) => {
  try {
    const rawPcb = [arrayOfTemp[2], arrayOfTemp[5], arrayOfTemp[8]];
    const rawCell = [
      arrayOfTemp[0],
      arrayOfTemp[1],
      arrayOfTemp[3],
      arrayOfTemp[4],
      arrayOfTemp[6],
      arrayOfTemp[7],
    ];
    let resultTempPcb = [];
    let resultTempCell = [];

    for (let index = 0; index < rawPcb.length; index++) {
      resultTempPcb.push(getStatus(rawPcb[index], index));
    }
    for (let index = 0; index < rawCell.length; index++) {
      resultTempCell.push(getStatus(rawCell[index], index));
    }

    const temperatures = [
      resultTempCell[0],
      resultTempCell[1],
      resultTempCell[2],
      resultTempCell[3],
      resultTempCell[4],
      resultTempCell[5],
      resultTempPcb[0],
      resultTempPcb[1],
      resultTempPcb[2],
    ];

    return temperatures;
  } catch (error) {
    console.log("error : ~ file TempAnalytic.js : ", error);
  }
};

export default TempAnalytic;

const getStatus = (tempValue, index) => {
  let color = "red";
  if (tempValue > 45000) {
  } else if (tempValue > 35000) {
    color = "yellow";
  } else {
    color = "green";
  }

  return {
    temperature: index + 1,
    value: Math.round(tempValue / 1000),
    color: color,
  };
};

const TempAnalytic = (arrayOfTemp) => {
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
  //   const statusArray = arrayOfTemp.map((temp) => {
  //     arrayTemp.push(getStatus(temp));
  //   });

  for (let index = 0; index < rawPcb.length; index++) {
    resultTempPcb.push(getStatus(rawPcb[index], index));
  }
  for (let index = 0; index < rawCell.length; index++) {
    resultTempCell.push(getStatus(rawCell[index], index));
  }

  //   console.log(
  //     "🚀 ~ file: TempAnalytic.js:20 ~ statusArray ~ arrayTemp:",
  //     arrayTemp
  //   );

  const resultTemp = {
    temperatures: {
      cells: [
        resultTempCell[0],
        resultTempCell[1],
        resultTempCell[2],
        resultTempCell[3],
        resultTempCell[4],
        resultTempCell[5],
      ],
      pcbs: [resultTempPcb[0], resultTempPcb[1], resultTempPcb[2]],
    },
  };
  //   console.log("🚀 ~ file: TempAnalytic.js:44 ~ TempAnalytic ~ resultTemp:", resultTemp)

  return resultTemp;
};

export default TempAnalytic;

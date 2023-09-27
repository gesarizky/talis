import Batas from "@/model/access/cms/LimitCell";
import ModelParam from "@/model/access/param/ModelParam";

const Color = {
  BAD: "red",
  GOOD: "green",
  WARNING: "yellow",
};

const getColor = (value) => {
  let resultColor = Color.BAD;
  if (value >= 80) {
    resultColor = Color.GOOD;
  } else if (value >= 50) {
    resultColor = Color.WARNING;
  }

  return resultColor;
};

const CellReal = (frame_name, dataVcell, modelParam) => {
  const configModelParam = new ModelParam(modelParam);
  const minVcell = Math.min(...dataVcell);
  const maxVcell = Math.max(...dataVcell);
  const selisihVcell = dataVcell
    .filter((value) => value !== minVcell)
    .map((value) => value - minVcell);

  const batasJSON = {
    badBawah: 2600,
    warningBawah: 3000,
    good: 3400,
    warningAtas: 3550,
    badAtas: 3600,
  };

  const batas = new Batas(batasJSON);
  const hasil = dataVcell.map((n, i) => {
    const status = batas.getStatus(n);
    return {
      cell: i + 1,
      value: (n / 1000).toFixed(2),
      color: status,
    };
  });
  const hasilContent = dataVcell.map((value, i) => {
    const rangeContent =
      configModelParam.maximumCellVoltage - configModelParam.minimumCellVoltage;

    const extractValue =
      value > configModelParam.minimumCellVoltage
        ? value - configModelParam.minimumCellVoltage
        : 0;

    const dataContent = parseFloat(
      ((extractValue / rangeContent) * 100).toFixed(1)
    );
    // const dataContent = ((value / configModelParam.maximumCellVoltage) * 100).toFixed(1);
    const rawHealth =
      configModelParam.capacityNew / configModelParam.capacityNow -
      (maxVcell - value) / configModelParam.maximumDifferentCell;
    const dataHealth =
      rawHealth > 0 ? parseFloat((rawHealth * 100).toFixed(1)) : 0; // if raw health > 0, x with percent, if not, set 0

    const content = {
      content: {
        value: dataContent,
        color: getColor(dataContent),
      },
    };
    const health = {
      health: {
        value: dataHealth,
        color: getColor(dataHealth),
      },
    };

    return {
      cell: i + 1,
      voltage: {
        color: batas.getStatus(value),
        value: parseFloat((value / 1000).toFixed(2)),
      },
      ...health,
      ...content,
      // health: {
      //     color: batas.getStatus(value),
      //     value: (((configModelParam.capacityNew / configModelParam.capacityNow) - ((maxVcell - value) / configModelParam.maximumDifferentCell)) * 100).toFixed(1)

      // },
      // content: {
      //     color: batas.getStatus(value),
      //     value: ((value / configModelParam.maximumCellVoltage) * 100).toFixed(1)

      // },
      // cell: {
      //     index: i + 1,
      //     value: value,
      //     color: batas.getStatus(value),
      //     content: {
      //         value: ((value / configModelParam.maximumCellVoltage) * 100).toFixed(1),
      //         color: batas.getStatus(value)
      //     },
      //     health: {
      //         value: (((configModelParam.capacityNew / configModelParam.capacityNow) - ((maxVcell - value) / configModelParam.maximumDifferentCell)) * 100).toFixed(1),
      //         color: batas.getStatus(value)
      //     }
      // }
    };
  });

  const result = { data: { frame_name: frame_name, result: hasilContent } };
  // const result = { data: { frame_name: frame_name, result: hasilContent } };

  return result;
};

export default CellReal;

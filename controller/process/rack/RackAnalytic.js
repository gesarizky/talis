
import HistoryDashboard from "@/model/history/dashboard/HistoryDashboard";

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
  } else {
    resultColor = Color.BAD;
  }

  return resultColor;
};

const RackAnalytic = async (dataUser, dataRacks) => {
  if(dataRacks){
  const UUID_User = dataUser;
  const rack_sn = dataRacks.rack_sn;
  const frame_data = dataRacks.data.battery;

  let minHealth = Infinity;
  let minContent = Infinity;

  frame_data.forEach((item) => {
    if (parseFloat(item.health.value) < minHealth) {
      minHealth = parseFloat(item.health.value);
    }
    if (parseFloat(item.content.value) < minContent) {
      minContent = parseFloat(item.content.value);
    }
  });

  const resultRack = {
    rack_sn: rack_sn,
    UUID_User: UUID_User,

    data: {
      health: {
        color: getColor(minHealth),
        value: minHealth,
      },
      content: {
        color: getColor(minContent),
        value: minContent,
      },
      rack_sn: rack_sn,
      UUID_User: UUID_User,
    },
  };

  await HistoryDashboard.upsert(resultRack);
}else{
  const UUID_User = dataUser;
  const resultRack = {
    rack_sn: null,
    UUID_User: UUID_User,
    data: null,
  };
  await HistoryDashboard.upsert(resultRack);
}
};

export default RackAnalytic;

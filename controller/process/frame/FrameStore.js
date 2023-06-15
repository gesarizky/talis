import HistoryRack from "@/model/history/rack/HistoryRack"; 
import RackAnalytic from "../rack/RackAnalytic";


const FrameStore = async (rms_sn, listFrameAnalytic, dataUser) => {
  const rack_sn = rms_sn;
  const UUID_User = dataUser;

  if (Object.keys(rack_sn).length <= 0) {
    // check if datarack SN not found
    return;
  }

  const result = {
    data: { battery: listFrameAnalytic },
    rack_sn,
    UUID_User,
  };
  await HistoryRack.upsert(result);
  RackAnalytic(result, dataUser);
};

export default FrameStore;

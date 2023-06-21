import HistoryRack from "@/model/history/rack/HistoryRack";
import RackAnalytic from "../rack/RackAnalytic";

const FrameStore = async (dataUser, rms_sn, listFrameAnalytic) => {
  if (listFrameAnalytic) {
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
    // return result;
    // console.log(result);
    await HistoryRack.upsert(result);
    RackAnalytic(dataUser, result);
    // return response;
  } else {
    const UUID_User = dataUser;
    const result = {
      data: null,
      rack_sn: null,
      UUID_User,
    };
    await HistoryRack.upsert(result);
    RackAnalytic(dataUser);
  }
};

export default FrameStore;

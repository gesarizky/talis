import StoreHistoryCms from "@/controller/device/rms/storedata/history/StoreHistoryCMS";

const FrameStore = async (dataUser, rms_sn, listFrameAnalytic) => {
  if (listFrameAnalytic) {
    const rack_sn = rms_sn;
    const UUID_User = dataUser;

    if (Object.keys(rack_sn).length <= 0) {
      // check if datarack SN not found
      return;
    }

    const result = {
      data: { cms_data: listFrameAnalytic },
      // rack_sn,
      UUID_User,
    };

    // await HistoryRack.create(result);
    await StoreHistoryCms(result);
  } else {
    const UUID_User = dataUser;
    const result = {
      data: { cms_data: [] },
      // rack_sn,
      UUID_User,
    };
    // await HistoryRack.create(result);
    await StoreHistoryCms(result);
  }
};

export default FrameStore;

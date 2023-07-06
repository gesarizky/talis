import StoreHistoryContent from "@/controller/device/rms/storedata/history/StoreHistoryContent";
import StoreHistoryHealth from "@/controller/device/rms/storedata/history/StoreHistoryHealth";
import StoreHistoryTempe from "@/controller/device/rms/storedata/history/StoreHistoryTemperatures";
import StoreHistoryVoltage from "@/controller/device/rms/storedata/history/StoreHistoryVoltage";


const FrameStore = async (
  dataUser,
  rms_sn,
  listFrameAnalytic,
  datacontent,
  datahealth,
  datavoltage,
  datatemperature
) => {
  if (listFrameAnalytic) {
    const rack_sn = rms_sn;
    // const UUID_User = dataUser;

    if (Object.keys(rack_sn).length <= 0) {
      // check if datarack SN not found
      return;
    }

    console.log("masuk framestore data ada");
    datahealth.map((data) => {
      StoreHistoryHealth(data);
    });
    datacontent.map((data) => {
      StoreHistoryContent(data);
    });
    datavoltage.map((data) => {
      StoreHistoryVoltage(data);
    });
    datatemperature.map((data) => {
      StoreHistoryTempe(data);
    });
  
  } else {
   
    const result = {
      UUID_User: dataUser,
       rack_sn:rms_sn,
      frame_name:"[]",
      health: [],
      content: [],
      voltage: [],
      temperatures: [],
    };
    await StoreHistoryHealth(result);
    await StoreHistoryContent(result);
    await StoreHistoryVoltage(result);
    await StoreHistoryTempe(result);
  }
};

export default FrameStore;

import StoreHistoryCms from "@/controller/device/rms/storedata/history/StoreHistoryCMS";
import StoreHistoryContent from "@/controller/device/rms/storedata/history/StoreHistoryContent";
import StoreHistoryHealth from "@/controller/device/rms/storedata/history/StoreHistoryHealth";
import StoreHistoryTempe from "@/controller/device/rms/storedata/history/StoreHistoryTemperatures";
import StoreHistoryVoltage from "@/controller/device/rms/storedata/history/StoreHistoryVoltage";

// const FrameStore = async (dataUser, rms_sn,
//   listFrameAnalytic
//   ) => {
//   if (listFrameAnalytic) {
//     const rack_sn = rms_sn;
//     const UUID_User = dataUser;

//     if (Object.keys(rack_sn).length <= 0) {
//       // check if datarack SN not found
//       return;
//     }

//      const result = {
//        data: { cms_data: listFrameAnalytic },
//        UUID_User,
//      };

//     await StoreHistoryCms(result);
//   } else {
//     const UUID_User = dataUser;
//     const result = {
//       data: { cms_data: [] },
//       UUID_User,
//     };
//     await StoreHistoryCms(result);
//   }
// };
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

    // const result = {
    //   UUID_User,
    //   // data_rack: { cms_data: listFrameAnalytic },
    //   data_rack: { cms_data: [] },
    //   cell_content: { cms_data: datacontent },
    //   cell_health: { cms_data: datahealth },
    //   cell_voltage: { cms_data: datavoltage },
    //   cell_temperature: { cms_data: datatemperature },
    // };
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
  

    // await StoreHistoryCms(result);
  } else {
    // const UUID_User = dataUser;
    // const result = {
    //   UUID_User,
    //   data_rack: { cms_data: [] },
    //   cell_content: { cms_data: [] },
    //   cell_health: { cms_data: [] },
    //   cell_voltage: { cms_data: [] },
    //   cell_temperature: { cms_data: [] },
    // };
    // await StoreHistoryCms(result);
    const result = {
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

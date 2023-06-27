import StoreHistoryCms from "@/controller/device/rms/storedata/history/StoreHistoryCMS";

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
const FrameStore = async (dataUser, rms_sn, listFrameAnalytic,datacontent,datahealth,datavoltage,datatemperature) => {
  if (listFrameAnalytic) {
    const rack_sn = rms_sn;
    const UUID_User = dataUser;

    if (Object.keys(rack_sn).length <= 0) {
      // check if datarack SN not found
      return;
    }

    const result = {
      UUID_User,
      data_rack: { cms_data: listFrameAnalytic },
      cell_content: { cms_data: datacontent },
      cell_health: { cms_data: datahealth },
      cell_voltage: { cms_data: datavoltage },
      cell_temperature: { cms_data: datatemperature },
    };

    await StoreHistoryCms(result);
  } else {
    const UUID_User = dataUser;
    const result = {
      UUID_User,
      data_rack: { cms_data: [] },
      cell_content: { cms_data: [] },
      cell_health: { cms_data: [] },
      cell_voltage: { cms_data: [] },
      cell_temperature: { cms_data: [] },
    };
    await StoreHistoryCms(result);
  }
};

export default FrameStore;

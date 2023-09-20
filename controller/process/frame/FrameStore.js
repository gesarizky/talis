import StoreHistoryContent from "@/controller/device/rms/storedata/history/StoreHistoryContent";
import StoreHistoryHealth from "@/controller/device/rms/storedata/history/StoreHistoryHealth";
import StoreHistoryTempe from "@/controller/device/rms/storedata/history/StoreHistoryTemperatures";
import StoreHistoryVoltage from "@/controller/device/rms/storedata/history/StoreHistoryVoltage";

/**
 * @description menyimpan hasil olah data cell frame ke database
 * @param {String} dataUser UUID User
 * @param {String} rack_sn Rack sn
 * @param {String} rms_sn rms sn
 * @param {Date} timestamp waktu di kirim
 * @param {Object} listFrameAnalytic data hasil olah frame
 * @param {Object} datacontent data hasil olah content frame
 * @param {Object} datahealth data hasil olah health frame
 * @param {Object} datavoltage data hasil olah voltage frame
 * @param {Object} datatemperature data hasil olah temperature frame
 * @returns 
 */

const FrameStore = async (
  dataUser,
  rack_sn,
  rms_sn,
  timestamp,
  listFrameAnalytic,
  datacontent,
  datahealth,
  datavoltage,
  datatemperature
) => {
  try {
    if (listFrameAnalytic) {
      // const rack_sn = rms_sn;
      // const UUID_User = dataUser;

      if (Object.keys(rack_sn).length <= 0) {
        // check if datarack SN not found
        return;
      }

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
        rack_sn: rack_sn,
        rms_sn: rms_sn,
        frame_name: "[]",
        health: [],
        content: [],
        voltage: [],
        temperatures: [],
        timestamp: timestamp,
      };
      await StoreHistoryHealth(result);
      await StoreHistoryContent(result);
      await StoreHistoryVoltage(result);
      await StoreHistoryTempe(result);
    }
  } catch (error) {
    console.log("error : ~ file FrameStore.js :", error);
  }
};

export default FrameStore;

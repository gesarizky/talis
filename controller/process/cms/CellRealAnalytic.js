import CMSModel from "@/model/access/cms/CMSModel";
import CellReal from "./CellReal";
import ModelParam from "@/model/access/param/ModelParam";
import TempRealAnalytic from "./TempRealAnalytic";
import FrameAnalytic from "../frame/FrameAnalytic";
import GetParam from "@/controller/param/GetParam";
import FrameStoreReal from "../frame/FrameStoreReal";
import StoreRealtimeCms from "@/controller/device/rms/storedata/realtime/StoreRealtimeCms";

/**
 * @description fungsi utama analisis cell tiap frame
 * @param {Object} RMSData data raw yang sudah di restruktur
 * @param {String} dataUser UUID User
 * @param {Date} timestamp waktu dikirim
 */

const CellRealAnalytic = async (RMSData) => {
  try {
    if (RMSData.cms_data[0]) {
      const device_sn = {}; // default config
      const dataParams = await GetParam(device_sn);
      const modelParams = new ModelParam(dataParams);
      const configCell = modelParams.cellNotUsed;
      const indexUnusedZeroBased = configCell.map((i) => i - 1);

      const resultFrame = [];

      const rack_sn = RMSData.rack_sn;
      const rms_sn = RMSData.rms_sn;

      RMSData.cms_data.forEach(async (element) => {
        const cms = element;
        const myModelInstance = CMSModel.fromJSON(cms);
        //   //TODO, remove NA frame
        if (myModelInstance.frame_name != "FRAME-32-NA") {
          const vcell = myModelInstance.vcell;
          const frame_name = myModelInstance.frame_name;
          const vpack = Math.round(
            (myModelInstance.pack[0] +
              myModelInstance.pack[1] +
              myModelInstance.pack[2]) /
              1000
          );
          const temps = myModelInstance.temp;
          const resultTemp = TempRealAnalytic(temps);

          const filteredVcell = vcell.filter(
            (_, index) => !indexUnusedZeroBased.includes(index)
          );
          const result = CellReal(frame_name, filteredVcell, dataParams);
          const health = FrameAnalytic(result, frame_name);
          const resultVoltage = { voltage: vpack };
          resultFrame.push(health);
          Object.assign(result["data"], health);
          Object.assign(result["data"], resultVoltage);
          Object.assign(result["data"], resultTemp);
          const realtimeCellsData = { frame_name: frame_name, ...result };
          // console.log("data cellRealAnalytic : ", realtimeCellsData);
          await StoreRealtimeCms(realtimeCellsData);
        }
      });
      FrameStoreReal(rack_sn, resultFrame);
    } else {
      //   const rack_sn = RMSData.rack_sn;
      //   const rms_sn = RMSData.rms_sn;
      //   const resultFrame = null;
      //   FrameStore(dataUser, rack_sn, rms_sn, timestamp, resultFrame); // store frame data
      console.log("data cellRealAnalytic : kosong");
    }
  } catch (error) {
    console.log("error : ~ file CellRealAnalytic.js :", error);
  }
};

export default CellRealAnalytic;

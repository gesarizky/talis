
import CMSModel from "@/model/access/cms/CMSModel";
import CellContent from "./CellContent";
import ModelParam from "@/model/access/param/ModelParam";
import FrameAnalytic from "../frame/FrameAnalytic";
import TempAnalytic from "./TempAnalytic";
import StoreHistoryCms from "@/controller/device/rms/storedata/history/StoreHistoryCMS";
import FrameStore from "../frame/FrameStore";


const CellAnalytic = async (RMSData, dataParams, dataUser) => {
  try {
    const UUID_User = dataUser;
    
    const modelParams = new ModelParam(dataParams);


    const configCell = modelParams.cellNotUsed;
    const indexUnusedZeroBased = configCell.map((i) => i - 1);

    const resultFrame = [];

    const rms_sn = RMSData.rack_sn;

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

        const resultTemp = TempAnalytic(temps);

        const filteredVcell = vcell.filter(
          (_, index) => !indexUnusedZeroBased.includes(index)
        );
        const minVcell = Math.min(...filteredVcell);
        const maxVcell = Math.max(...filteredVcell);
        const selisihVcell = filteredVcell
          .filter((value) => value !== minVcell)
          .map((value) => value - minVcell);
        let result = CellContent(frame_name, filteredVcell, dataParams);
        const health = FrameAnalytic(result, frame_name);
        const resultVoltage = { voltage: vpack };
        resultFrame.push(health);
        Object.assign(result["data"], health);
        Object.assign(result["data"], resultVoltage);
        Object.assign(result["data"], resultTemp);
        const realtimeCellsData = { frame_name: frame_name,UUID_User, ...result };
        await StoreHistoryCms(realtimeCellsData);
        // await StoreRealtimeCms(realtimeCellsData);
        // console.log(realtimeCellsData);
      }
    });
    FrameStore(rms_sn, resultFrame, dataUser); // store frame data
  } catch (error) {
    console.log(error);
  }
};

export default CellAnalytic;

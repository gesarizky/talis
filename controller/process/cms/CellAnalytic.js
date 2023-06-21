import CMSModel from "@/model/access/cms/CMSModel";
import CellContent from "./CellContent";
import CellsContent from "./CellsContent";
import CellsHealth from "./CellsHealth";
import CellsVoltage from "./CellsVoltage";
import ModelParam from "@/model/access/param/ModelParam";
import FrameAnalytic from "../frame/FrameAnalytic";
import TempAnalytic from "./TempAnalytic";
import FrameStore from "../frame/FrameStore";
import GetParam from "@/controller/param/GetParam";

const CellAnalytic = async (RMSData, dataUser) => {
  try {
    if (RMSData.cms_data[0]) {
      const device_sn = {}; // default config
      const dataParams = await GetParam(device_sn);

      // const UUID_User = dataUser;
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
          
          const temps = myModelInstance.temp;

          const resultTemp = TempAnalytic(temps);

          const filteredVcell = vcell.filter(
            (_, index) => !indexUnusedZeroBased.includes(index)
          );
          let result = CellContent(frame_name, filteredVcell, dataParams);
          const resultcontens = CellsContent(filteredVcell, dataParams);
          const resulthealth = CellsHealth(filteredVcell, dataParams);
          const resultvoltage = CellsVoltage(filteredVcell);

          const health = FrameAnalytic(result, frame_name, rms_sn);
          resultFrame.push(health);
          Object.assign(health["health"], resulthealth);
          // Object.assign(health["content"], resultcontens);
          // Object.assign(health["voltage"], resultvoltage);
          // Object.assign(health["temperatures"], resultTemp);
          
        }
      });
      // console.log(resultFrame);
      FrameStore(dataUser, rms_sn, resultFrame); // store frame data
    } else {
      const rms_sn = RMSData.rack_sn;
      const UUID_User = dataUser;
      const resultFrame = null;
      FrameStore(dataUser, rms_sn, resultFrame); // store frame data
    }
  } catch (error) {
    console.log(error);
  }
};

export default CellAnalytic;

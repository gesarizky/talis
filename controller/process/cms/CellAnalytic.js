import CMSModel from "@/model/access/cms/CMSModel";
import CellsContent from "./CellsContent";
import CellsHealth from "./CellsHealth";
import CellsVoltage from "./CellsVoltage";
import ModelParam from "@/model/access/param/ModelParam";
import TempAnalytic from "./TempAnalytic";
import FrameStore from "../frame/FrameStore";
import GetParam from "@/controller/param/GetParam";

const CellAnalytic = async (RMSData, dataUser, timestamp) => {
  try {
    if (RMSData.cms_data[0]) {
      const device_sn = {}; // default config
      const dataParams = await GetParam(device_sn);

      // const UUID_User = dataUser;
      const modelParams = new ModelParam(dataParams);
      const configCell = modelParams.cellNotUsed;
      const indexUnusedZeroBased = configCell.map((i) => i - 1);

      const resultFrame = [];
      const resultcontent = [];
      const resulthealth = [];
      const resultvoltage = [];
      const resulttemperature = [];

      const rack_sn = RMSData.rack_sn;
      const rms_sn = RMSData.rms_sn;

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
          const resultcontens = CellsContent(filteredVcell, dataParams);
          const resulthealths = CellsHealth(filteredVcell, dataParams);
          const resultvoltages = CellsVoltage(filteredVcell);

          resultFrame.push({
            rack_sn: rack_sn,
            rms_sn: rms_sn,
            frame_name: frame_name,
            timestamp: timestamp,
          });
          resultcontent.push({
            UUID_User: dataUser,
            rack_sn: rack_sn,
            rms_sn: rms_sn,
            frame_name: frame_name,
            content: resultcontens,
            timestamp: timestamp,
          });
          resulthealth.push({
            UUID_User: dataUser,
            rack_sn: rack_sn,
            rms_sn: rms_sn,
            frame_name: frame_name,
            health: resulthealths,
            timestamp: timestamp,
          });
          resultvoltage.push({
            UUID_User: dataUser,
            rack_sn: rack_sn,
            rms_sn: rms_sn,
            frame_name: frame_name,
            voltage: resultvoltages,
            timestamp: timestamp,
          });
          resulttemperature.push({
            UUID_User: dataUser,
            rack_sn: rack_sn,
            rms_sn: rms_sn,
            frame_name: frame_name,
            temperatures: resultTemp,
            timestamp: timestamp,
          });
        }
      });
      FrameStore(
        dataUser,
        rack_sn,
        rms_sn,
        timestamp,
        resultFrame,
        resultcontent,
        resulthealth,
        resultvoltage,
        resulttemperature
      ); // store frame data
    } else {
      const rack_sn = RMSData.rack_sn;
      const rms_sn = RMSData.rms_sn;
      const resultFrame = null;
      FrameStore(dataUser, rack_sn, rms_sn, timestamp, resultFrame); // store frame data
    }
  } catch (error) {
    console.log("error CellAnalytic :", error);
  }
};

export default CellAnalytic;

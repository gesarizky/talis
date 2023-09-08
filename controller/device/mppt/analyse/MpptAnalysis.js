import StoreHistoryMppt from "../storedata/history/AddDataMppt";
import decimalFixed from "./process/decimalFixed";
import getPower from "./process/getPower";
import mpptStatus from "./process/mpptStatus";
const MpptAnalysis = async (datamppt) => {
  try {
    const { UUID_User, data } = datamppt;
    const { mppt_sn, rack_sn } = data;
    const DataSystem = data.mppt_data;
    if (DataSystem[0]) {
      for (const group of DataSystem) {
        const DataGroup = group.group_data;
        for (const data of DataGroup) {
          const DataModule = data.module_data;
          const groupNumber = data.group_number;
          for (const datamodule of DataModule) {
            const systemVoltage = await decimalFixed(group.system_voltage);
            const systemCurrent = await decimalFixed(group.system_current);
            const groupVoltage = await decimalFixed(data.group_voltage);
            const groupCurrent = await decimalFixed(data.group_current);
            const moduleVoltage = await decimalFixed(datamodule.module_voltage);
            const moduleCurrent = await decimalFixed(datamodule.module_current);
            const result = {
              UUID_User: UUID_User,
              rack_sn: rack_sn,
              mppt_sn: mppt_sn,
              group: groupNumber,
              module: datamodule.module_number,
              data: {
                mppt_data: [
                  {
                    connected_module: group.connected_module,
                    system_voltage: systemVoltage,
                    system_current: systemCurrent,
                    system_power: await getPower(systemVoltage, systemCurrent),
                    group_voltage: groupVoltage,
                    group_current: groupCurrent,
                    group_power: await getPower(groupVoltage, groupCurrent),
                    module_voltage: moduleVoltage,
                    module_current: moduleCurrent,
                    module_power: await getPower(moduleVoltage, moduleCurrent),
                    module_temperature: datamodule.module_temperature,
                    state_0: await mpptStatus(datamodule.state_0),
                    state_1: await mpptStatus(datamodule.state_1),
                    state_2: await mpptStatus(datamodule.state_2),
                  },
                ],
              },
            };
            await StoreHistoryMppt(result);
          }
        }
      }
    } else {
      const result = {
        UUID_User: UUID_User,
        rack_sn: rack_sn,
        mppt_sn: mppt_sn,
        group: null,
        module: null,
        data: {
          mppt_data: [],
        },
      };
      await StoreHistoryMppt(result);
    }
  } catch (error) {
    console.log("error : ~ MpptAnalysis.js :", error);
  }
};

export default MpptAnalysis;

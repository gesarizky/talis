// get config for specific device

import ParamSetting from "@/model/param/ParamSetting";

const GetParam = async (params) => {
  try {
    try {
      if (Object.keys(params).length === 0) {
        // check if device_sn json is null

        params["device_sn"] = "default";
      }
    } catch (error) {
      params["device_sn"] = "default";
    }

    const dataParams = await ParamSetting.findOne({
      // just return 1 instance
      where: params,
      attributes: ["device_sn", "config"], // only specific data , disable update at an created at
    });

    dataParams.config.cell_not_used = dataParams.config.cell_not_used
      .split(",")
      .map(Number); // convert array string into number
    return dataParams;
  } catch (error) {
    console.log(error);
  }
};

const GetParamCellUnUsed = async (device_sn) => {
  const dataParams = await GetParam(device_sn);
  const configCell = dataParams.config.cell_not_used;
  return configCell;
};

export default GetParam;

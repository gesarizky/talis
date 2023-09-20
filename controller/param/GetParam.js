import ParamSetting from "@/model/param/ParamSetting";

/**
 * @description mengambil parameter setting
 * @param {*} params
 * @returns param config
 */

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
    console.log("error : ~ file GetParam.js : ", error);
  }
};

export default GetParam;

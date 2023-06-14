// import InverterStatusSetting from "@/models/param/InverterStatusSetting";

const ResultInverterStatus = async (datainverter) => {
  try {
    // const data = await InverterStatusSetting.findOne({
    //   where: { params: "temperature" },
    // });
    const data = { value: 60000 };
    const datainverterstatus = datainverter.inverter_status;
    const datapmodulestatus = datainverter.power_module_status;
    const datatemperature = datainverter.power_module_ambient_temperature_mc;

    let newdatainverterstatus = "";
    if (datainverterstatus == 2) {
      newdatainverterstatus = "charge";
    } else if (datainverterstatus == 0) {
      newdatainverterstatus = "discharge";
    } else {
      throw {
        message: "inverter status data error",
      };
    }
    function decimalToBinary(decimal) {
      let binary = [];
      while (decimal > 0) {
        binary.unshift(decimal % 2);
        decimal = Math.floor(decimal / 2);
      }
      while (binary.length < 8) {
        binary.unshift(0);
      }
      return binary;
    }

    const [status2, status1, status0] = datapmodulestatus.map(decimalToBinary);

    let newdatastatusinverter;
    let newdatastatuserror = { error: [], warning: [] };

    if (
      status2
        .slice(1, 5)
        .concat(status1.slice(2, 4), status1[7], status0[7])
        .includes(1)
    ) {
      newdatastatusinverter = "error";
      if (status2[1]) newdatastatuserror.error.push(1);
      if (status2[2]) newdatastatuserror.error.push(2);
      if (status2[3]) newdatastatuserror.error.push(3);
      if (status2[4]) newdatastatuserror.error.push(4);
      if (status1[2]) newdatastatuserror.error.push(5);
      if (status1[3]) newdatastatuserror.error.push(6);
      if (status1[7]) newdatastatuserror.error.push(7);
      if (status0[7]) newdatastatuserror.error.push(8);
    } else if (status1[3] === 0 && datatemperature >= data.value) {
      newdatastatusinverter = "warning";
      if (datatemperature >= 70000) {
        newdatastatusinverter = "error";
        newdatastatuserror.error.push(6);
      } else {
        newdatastatuserror.warning.push(6);
      }
    } else {
      newdatastatusinverter = "normal";
    }
    return { newdatainverterstatus, newdatastatusinverter, newdatastatuserror };
  } catch (error) {
    console.error(error);
    throw {
      message: error.message,
    };
  }
};

export default ResultInverterStatus;

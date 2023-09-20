/**
 * @description mengidentifikasi status inverter
 * @param {Object} datainverter data raw inverter
 * @returns status inverter
 */

const ResultInverterStatus = async (datainverter) => {
  try {
    const {
      inverter_status,
      power_module_status,
      power_module_ambient_temperature_mc,
    } = datainverter;
    let newdatastatusinverter;
    let newdatainverterstatus = "";
    let newdatastatuserror = { error: [], warning: [] };

    if (inverter_status == 2) newdatainverterstatus = "charge";
    if (inverter_status == 0) newdatainverterstatus = "discharge";

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

    const [status2, status1, status0] =
      power_module_status.map(decimalToBinary);

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
    } else if (
      status1[3] === 0 &&
      power_module_ambient_temperature_mc >= 60000
    ) {
      newdatastatusinverter = "warning";
      if (power_module_ambient_temperature_mc >= 70000) {
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
    console.error("error : ~ file ProcessInverterStatus.js : ", error);
  }
};

export default ResultInverterStatus;

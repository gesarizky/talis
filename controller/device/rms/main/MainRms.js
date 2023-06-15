
// main function get Inverter

import getDataRms from "../get/GetDataRms";
import postRmsData from "../post/PostRmsData";


const mainRms = async () => {
    try {
        if (!(response == 0)) {
            for (let i = 0; i < response.length; i++) {
                const url = "http://" + response[i]['device_ip'] + "/get-cms-data";

                // const res = new ModelInverterRaw(response[i]);
                // res.code = 200;
                const device_sn = response[i]['device_sn'];
                // console.log('url rms', url);
                const data = await getDataRms(url, device_sn);
                // console.log('data RMS', data)
                postRmsData(data)
            }
        }
    } catch (error) {
        console.log("Cant connect into DB Server");
        
    }
}

export default mainRms

/**
 * @description constructor cms
 */

class CMSModel {

  constructor(msg_count, frame_name, cms_code, base_code, mcu_code, site_location, bid, vcell, temp, pack, wake_status, door_status) {

    this.msg_count = msg_count;
    this.frame_name = frame_name;
    this.cms_code = cms_code;
    this.base_code = base_code;
    this.mcu_code = mcu_code;
    this.site_location = site_location;
    this.bid = bid;
    this.vcell = vcell;
    this.temp = temp;
    this.pack = pack;
    this.wake_status = wake_status;
    this.door_status = door_status;
  }

  getMsgCount() {
    return this.msg_count;
  }

  getFrameName() {
    return this.frame_name;
  }

  getCmsCode() {
    return this.cms_code;
  }

  getBaseCode() {
    return this.base_code;
  }

  getMcuCode() {
    return this.mcu_code;
  }

  getSiteLocation() {
    return this.site_location;
  }

  getBid() {
    return this.bid;
  }

  getVcell() {
    return this.vcell;
  }

  getTemp() {
    return this.temp;
  }

  getPack() {
    return this.pack;
  }

  getWakeStatus() {
    return this.wake_status;
  }

  getDoorStatus() {
    return this.door_status;
  }

  static fromJSON(json) {

    const { msg_count, frame_name, cms_code, base_code, mcu_code, site_location, bid, vcell, temp, pack, wake_status, door_status } = json;
    return new CMSModel(msg_count, frame_name, cms_code, base_code, mcu_code, site_location, bid, vcell, temp, pack, wake_status, door_status);
  }

  static fromRaw(data) {
    return new CMSModel(data.msg_count, data.frame_name, data.cms_code, data.base_code, data.mcu_code, data.site_location, data.bid, data.vcell, data.temp, data.pack, data.wake_status, data.door_status);
  }
}

export default CMSModel;


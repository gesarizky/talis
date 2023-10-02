class RealtimeModel {
  constructor(data) {
    this.rms_sn = data.rms_sn;
    this.rack_sn = data.rack_sn;
    this.UUID_User = data.UUID_User;
    this.health = { value: data.health, color: getColor(data.health) };
    this.content = { value: data.content, color: getColor(data.content) };
    this.mode = "standby";
    this.cycling = false;
    this.updatedAt = data.updatedAt;
  }
}
const Color = {
  BAD: "red",
  GOOD: "green",
  WARNING: "yellow",
};

const getColor = (value) => {
  let resultColor = Color.BAD;
  if (value >= 80) {
    resultColor = Color.GOOD;
  } else if (value >= 50) {
    resultColor = Color.WARNING;
  } else {
    resultColor = Color.BAD;
  }
  return resultColor;
};

export default RealtimeModel;

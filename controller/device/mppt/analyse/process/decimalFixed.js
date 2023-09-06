const decimalFixed = async (value) => {
  try {
    let digitDesimal = 2;
    let valueFixed =
      Math.round(value * Math.pow(10, digitDesimal)) /
      Math.pow(10, digitDesimal);
    return valueFixed;
  } catch (error) {
    console.log("error : ~ file : decimalFixed.js ", error);
  }
};
export default decimalFixed;

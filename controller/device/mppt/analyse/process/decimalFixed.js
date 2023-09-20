/**
 * @description menyederhanakan nilai (2 digit sesudah koma)
 * @param {Number} value nilai yang akan diubah
 * @returns nilai yang sudah disederhanakan
 */
const decimalFixed = async (value) => {
  try {
    let digitDesimal = 2; //berapa digit setelah koma
    let valueFixed =
      Math.round(value * Math.pow(10, digitDesimal)) /
      Math.pow(10, digitDesimal);
    return valueFixed;
  } catch (error) {
    console.log("error : ~ file : decimalFixed.js ", error);
  }
};
export default decimalFixed;

import decimalFixed from "./decimalFixed";
const getPower = async (volt, ampere) => {
  try {
    const powerdata = (volt * ampere) / 1000;
    const powerFixed = await decimalFixed(powerdata);
    return powerFixed;
  } catch (error) {
    console.log("error : ~ file : getPower.js ", error);
  }
};
export default getPower;

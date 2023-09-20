
/**
 * @description mengolah data raw mppt menjadi status mppt
 * @param {Object} value data raw mppt
 * @returns status mppt
 */

const mpptStatus = async (value) => {
  let status = [];
  async function decimalToBinary(decimal) {
    let binary = [];
    while (decimal > 0) {
      binary.unshift(decimal % 2);
      decimal = Math.floor(decimal / 2);
    }
    while (binary.length < 8) {
      binary.unshift(0);
    }

    if (binary[0] == 1) status.push(7);
    if (binary[1] == 1) status.push(6);
    if (binary[2] == 1) status.push(5);
    if (binary[3] == 1) status.push(4);
    if (binary[4] == 1) status.push(3);
    if (binary[5] == 1) status.push(2);
    if (binary[6] == 1) status.push(1);
    if (binary[7] == 1) status.push(0);

    return status;
  }
  const data = await decimalToBinary(value);
  return data;
};
export default mpptStatus;

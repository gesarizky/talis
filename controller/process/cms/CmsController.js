import CellAnalytic from "./CellAnalytic";

const ParseCMS = async (dataCms, dataParams, dataUser) => {
  try {

    await CellAnalytic(dataCms, dataParams, dataUser);

    
  } catch (error) {
    console.log(error);
  }
};


export default ParseCMS;
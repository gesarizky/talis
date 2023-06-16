import CellAnalytic from "./CellAnalytic";

const ParseCMS = async (dataCms, dataUser) => {
  try {

    await CellAnalytic(dataCms, dataUser);

    
  } catch (error) {
    console.log(error);
  }
};


export default ParseCMS;
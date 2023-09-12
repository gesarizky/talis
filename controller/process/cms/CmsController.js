import CellAnalytic from "./CellAnalytic";

const ParseCMS = async (dataCms, dataUser,timestamp) => {
  try {

    await CellAnalytic(dataCms, dataUser, timestamp);

    
  } catch (error) {
    console.log("error CmsController :",error);
  }
};


export default ParseCMS;
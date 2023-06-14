import DataBase from "../model/Database";

const AddDataTodos = async (data) => {
  try {
    await DataBase.upsert({
      id: data.id,
      nilai: data.nilai * 10,
    });
    console.log(`${data.nilai} is Saved`);
    return `${data.nilai} is Saved`;
  } catch (error) {
    console.log(error);
    throw {
      message: error.message,
    };
  }
};

export default AddDataTodos;

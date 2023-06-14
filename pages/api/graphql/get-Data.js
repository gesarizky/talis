// import getData from "@/controller/graphql/get-server";
import getDataTodos from "@/controller/graphql/getdata";
import getDataInverter from "@/controller/graphql/device/inverter/get-data/GetDataInverter";

export default async function handler(req, res) {
  const posts = await getDataInverter();
  // const posts = await getDataTodos();
  // const posts = await getData();
  return res.json(posts);
}

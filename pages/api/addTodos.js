import AddDataTodos from "@/controller/addDataTodos";
export default async function handler(req, res) {
  const data = req.body;
  try {
    const response = await AddDataTodos(data);
    res.status(200).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

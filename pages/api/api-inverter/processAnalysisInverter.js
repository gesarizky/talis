import InverterAnalysis from "@/controller/device/inverter/analyse/InverterAnalysis";
export default async function handler(req, res) {
  const datainverter = req.body;
  try {
    const posts = await InverterAnalysis(datainverter);
    return res.json(posts);
  } catch (error) {
    return res.status(404).json(error);
  }
}
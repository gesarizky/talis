import getRealtimeDb from "@/controller/realtime/get/getRealtimeRms";
export default async function handler(req, res) {
  try {
    const respon = await getRealtimeDb();
    res.status(200).json(respon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

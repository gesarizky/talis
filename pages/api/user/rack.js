import RealtimeRack from "@/model/realtime/rack";
export default async function handler(req, res) {
  try {
    const query = req.query;
    const result = await RealtimeRack.findOne({
      where: query,
      raw: true,
    });
    let { data, ...rest } = result;
    const updatedJson = { rack_sn: rest.rack_sn, ...data };
    const respon = { ...updatedJson, code: 200 };
    respon["inverter"] = { color: "red", value: "error" };
    res.status(200).json(respon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

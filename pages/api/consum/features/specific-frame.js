import RealtimeCells from "@/model/realtime/cell";
export default async function handler(req, res) {
  try {
    const query = req.query;
    const resultSpesificFrame = await RealtimeCells.findOne({
      where: { data: query },
      attributes: ["frame_name", "data", "updatedAt"],
    });
    let result = {
      frame_name: resultSpesificFrame.frame_name,
      //  lastUpdate: resultSpesificFrame.lastUpdate,
      lastTime: resultSpesificFrame.updatedAt,
      code: 200,
      cells: resultSpesificFrame.data.result,
      health: resultSpesificFrame.data.health,
      content: resultSpesificFrame.data.content,
      voltage: resultSpesificFrame.data.voltage,
      temperatures: resultSpesificFrame.data.temperatures,
    };
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

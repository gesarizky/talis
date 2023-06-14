import StoreDataRealtimeInverter from "@/controller/device/inverter/storedata/realtime/AddDataRealtime";
import StoreDataHistory from "@/controller/device/inverter/storedata/history/AddDataHistory";
export default async function handler(req, res) {
  const data = req.body;
  try {
    const response = 
    await StoreDataRealtimeInverter(data);
    await StoreDataHistory(data);
    res.status(201).json({
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

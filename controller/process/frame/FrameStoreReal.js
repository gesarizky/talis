import RealtimeRack from "@/model/realtime/rack";
const FrameStoreReal = async (rack_sn, listFrameAnalytic) => {
  const result = {
    data: { battery: listFrameAnalytic },
    rack_sn: rack_sn,
  };
  //   console.log("data FrameStoreReal :", result);
    await RealtimeRack.upsert(result);
};

export default FrameStoreReal;

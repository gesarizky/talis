import { gql } from "@apollo/client";
import { apolloClient } from "../apollo";
import postRealtimeData from "@/controller/realtime/post/PostDataRealtime";
import RealtimeDb from "@/model/realtime/database";

const getDataRealtime = async () => {
  try {
    const timestamp = await RealtimeDb.max("updatedAt");
    let lastUpdatedAt = timestamp || "1970-01-01T00:00:00.000Z";

    const GET_REALTIME_SUBCRIPTION = gql`
      subscription {
        Realtime {
          data
          UUID_User
          rms_sn
          updatedAt
        }
      }
    `;
    const handleDataUpdate = (data) => {
      // console.log("Received new realtime data:", data);
      const newDateLastUpdatedAt = new Date(lastUpdatedAt); // Konversi lastUpdatedAt ke objek Date
      const newData = data.filter(
        (dataItem) => new Date(dataItem.updatedAt) > newDateLastUpdatedAt
      );
      let maxUpdatedAt;

      if (newData.length > 0) {
        maxUpdatedAt = new Date(newData[0].updatedAt);
      } else {
        maxUpdatedAt = undefined;
      }
      newData.forEach((dataItem) => {
        // console.log("Processing new realtime data:", dataItem);
        const updatedAt = new Date(dataItem.updatedAt);
        if (updatedAt > maxUpdatedAt) {
          maxUpdatedAt = updatedAt;
        }
        lastUpdatedAt = maxUpdatedAt.toISOString(); // Kembali konversi ke string ISO
        postRealtimeData(dataItem);
      });
    };

    const subscribeToRealtime = () => {
      const subscription = apolloClient.subscribe({
        query: GET_REALTIME_SUBCRIPTION,
      });
      console.log("Attempting to connect realtime subscription...");
      subscription.subscribe({
        next: (result) => {
          const data = result.data.Realtime;
          handleDataUpdate(data);
        },
        error: (error) => {
          console.error("Subscription data realtime error:", error.message);
          // Coba kembali berlangganan saat sambungan terputus
          setTimeout(subscribeToRealtime, 20000); // Coba kembali setiap 5 detik (sesuaikan dengan kebutuhan Anda)
        },
      });
    };
    subscribeToRealtime();
  } catch (error) {
    console.error("Error : ~ file GetDataRealtime.js :", error.message);
  }
};
export default getDataRealtime;

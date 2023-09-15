import { gql } from "@apollo/client";
import { apolloClient } from "../apollo";
// import AddDataRealtime from "@/controller/realtime/storedata/AadDataRealtime";
import postRealtimeData from "@/controller/realtime/post/PostDataRealtime";

const getDataRealtime = async () => {
  const GET_REALTIME_SUBCRIPTION = gql`
    subscription {
      Realtime(order_by: { updatedAt: desc }) {
        data
        UUID_User
        updatedAt
      }
    }
  `;
  const handleDataUpdate = (data) => {
    // Olah data yang diperbarui di sini
    data.map((data) => {
      // console.log("data realtime",data);
      // AddDataRealtime(data)
      postRealtimeData(data);
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
        setTimeout(subscribeToRealtime, 5000); // Coba kembali setiap 5 detik (sesuaikan dengan kebutuhan Anda)
      },
    });
  };
  subscribeToRealtime();
};
export default getDataRealtime;

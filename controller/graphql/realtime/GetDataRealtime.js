import { gql } from "@apollo/client";
import { apolloClient } from "../apollo";
// import AddDataRealtime from "@/controller/realtime/storedata/AadDataRealtime";
import postRealtimeData from "@/controller/realtime/post/PostDataRealtime";

const getDataRealtime = async () => {
  const GET_REALTIME_SUBCRIPTION = gql`
    subscription {
      Realtime(order_by: { updatedAt: desc }, limit: 1) {
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
  const subscription = apolloClient.subscribe({
    query: GET_REALTIME_SUBCRIPTION,
  });
  subscription.subscribe({
    next: (result) => {
      const data = result.data.Realtime;
      handleDataUpdate(data);
    },
    error: (error) => {
      console.error("Subscription error:", error);
    },
  });
};
export default getDataRealtime;

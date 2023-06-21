import { gql } from "@apollo/client";
import { apolloClient } from "../apollo"; 
import AddDataAlert from "@/controller/alert/storedata/AadDataalert";

const getDataAlert = async () => {
  const GET_ALERT_SUBCRIPTION = gql`
    subscription {
      Alert(limit: 1, order_by: { createdAt: desc }) {
        UUID_User
        data
        id
      }
    }
  `;
  const handleDataUpdate = (data) => {
    // Olah data yang diperbarui di sini
    data.map((data) => {
      // console.log(data);
      AddDataAlert(data);
    });
  };
  const subscription = apolloClient.subscribe({
    query: GET_ALERT_SUBCRIPTION,
  });
  subscription.subscribe({
    next: (result) => {
      const data = result.data.Alert;
      handleDataUpdate(data);
    },
    error: (error) => {
      console.error("Subscription error:", error);
    },
  });
};
export default getDataAlert;
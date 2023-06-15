import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postRmsData from "@/controller/device/rms/post/PostRmsData";

const getDataRms = async () => {
  const GET_RMS_SUBCRIPTION = gql`
    subscription {
      RMS(limit: 1, order_by: { createdAt: desc }) {
        UUID_User
        data
        id
      }
    }
  `;
  const handleDataUpdate = (data) => {
    // Olah data yang diperbarui di sini
    const datamap =
     data.map((data) => 
     {
      postRmsData(data)
    }
    );
  };
  const subscription = apolloClient.subscribe({
    query: GET_RMS_SUBCRIPTION,
  });
  subscription.subscribe({
    next: (result) => {
      const data = result.data.RMS;
      handleDataUpdate(data);
    },
    error: (error) => {
      console.error("Subscription error:", error);
    },
  });
};
export default getDataRms;

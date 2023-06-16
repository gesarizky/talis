import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postInverterData from "../../../../device/inverter/post/PostInverterData";

const getDataInverter = async () => {
  const GET_INVERTER_SUBCRIPTION = gql`
    subscription {
      Inverter(order_by: { createdAt: desc }, limit: 1) {
        id
        data
        UUID_User
      }
    }
  `;
  const handleDataUpdate = (data) => {
    // Olah data yang diperbarui di sini
    data.map((data) => {
      // console.log(data);
      postInverterData(data);
    });
  };
  const subscription = apolloClient.subscribe({
    query: GET_INVERTER_SUBCRIPTION,
  });
  subscription.subscribe({
    next: (result) => {
      const data = result.data.Inverter;
      handleDataUpdate(data);
    },
    error: (error) => {
      console.error("Subscription error:", error);
    },
  });
};
export default getDataInverter;

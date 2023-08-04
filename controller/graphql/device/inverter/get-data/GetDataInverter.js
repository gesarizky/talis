import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postInverterData from "../../../../device/inverter/post/PostInverterData";

const getDataInverter = async () => {
  try {
    const GET_LAST_CREATED_AT = gql`
      query GetLastCreatedAt {
        Inverter(limit: 1, order_by: { createdAt: desc }) {
          createdAt
        }
      }
    `;

    const lastCreatedAtResult = await apolloClient.query({
      query: GET_LAST_CREATED_AT,
    });
    let lastCreatedAt =
      lastCreatedAtResult.data.RMS[0]?.createdAt || "1970-01-01T00:00:00.000Z"; // Jika tidak ada data, gunakan timestamp awal

    const GET_INVERTER_SUBCRIPTION = gql`
      subscription GetNewInverterData($lastSeenTimestamp: timestamptz) {
        Inverter(where: { createdAt: { _gt: $lastSeenTimestamp } }) {
          id
          data
          UUID_User
        }
      }
    `;

    const handleDataUpdate = (data) => {
      const newData = data.filter(
        (dataItem) => dataItem.createdAt > lastCreatedAt
      );
      newData.forEach((dataItem) => {
        console.log("Processing new data:", dataItem);
        console.log("Waktu yang di track", lastCreatedAt);
        lastCreatedAt = dataItem.createdAt;
        postInverterData(dataItem);
      });
    };

    const subscription = apolloClient.subscribe({
      query: GET_INVERTER_SUBCRIPTION,
      variables: {
        lastSeenTimestamp: lastCreatedAt,
      },
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
  } catch (error) {
    console.error("Error fetching lastCreatedAt:", error);
  }
};
export default getDataInverter;

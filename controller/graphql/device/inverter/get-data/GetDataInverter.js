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
      lastCreatedAtResult.data.Inverter[0]?.createdAt ||
      "1970-01-01T00:00:00.000Z"; // Jika tidak ada data, gunakan timestamp awal
    const GET_INVERTER_SUBCRIPTION = gql`
      subscription GetNewInverterData($lastSeenTimestamp: timestamptz = "${lastCreatedAt}") {
        Inverter(where: { createdAt: { _gt: $lastSeenTimestamp } }) {
          id
          data
          UUID_User
          createdAt
        }
      }
    `;

    const handleDataUpdate = (data) => {
      const newData = data.filter(
        (dataItem) => dataItem.createdAt > lastCreatedAt
      );
      let maxCreatedAt;

      if (newData.length > 0) {
        maxCreatedAt = newData[0].createdAt;
      } else {
        maxCreatedAt = undefined;
      }
      newData.forEach((dataItem) => {
        // console.log("Processing new data:", dataItem);
        // console.log("Waktu yang di track", lastCreatedAt);
        if (dataItem.createdAt > maxCreatedAt) {
          maxCreatedAt = dataItem.createdAt;
        }
        lastCreatedAt = maxCreatedAt;
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
        console.error("Subscription data inverter error:", error);
      },
    });
  } catch (error) {
    console.error("Error fetching data inverter lastCreatedAt:", error);
  }
};
export default getDataInverter;

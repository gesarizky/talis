import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postRmsData from "@/controller/device/rms/post/PostRmsData";

const getDataRms = async () => {
  try {
    const GET_LAST_CREATED_AT = gql`
      query GetLastCreatedAt {
        RMS(limit: 1, order_by: { createdAt: desc }) {
          createdAt
        }
      }
    `;

    const lastCreatedAtResult = await apolloClient.query({
      query: GET_LAST_CREATED_AT,
    });

    let lastCreatedAt =
      lastCreatedAtResult.data.RMS[0]?.createdAt || "1970-01-01T00:00:00.000Z"; // Jika tidak ada data, gunakan timestamp awal

    const GET_RMS_SUBCRIPTION = gql`
      subscription GetNewRmsData($lastSeenTimestamp: timestamptz = "${lastCreatedAt}") {
        RMS(where: { createdAt: { _gt: $lastSeenTimestamp } }) {
          UUID_User
          data
          id
          createdAt
        }
      }
    `;

    const handleDataUpdate = (data) => {
      // console.log("data non filter :", data);
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
        // console.log("Processing new data:", dataItem.UUID_User);
        // console.log("Waktu yang di track", lastCreatedAt);
        if (dataItem.createdAt > maxCreatedAt) {
          maxCreatedAt = dataItem.createdAt;
        }
        lastCreatedAt = maxCreatedAt;
        postRmsData(dataItem);
      });
    };

    const subscription = apolloClient.subscribe({
      query: GET_RMS_SUBCRIPTION,
      variables: {
        lastSeenTimestamp: lastCreatedAt,
      },
    });

    subscription.subscribe({
      next: (result) => {
        const data = result.data.RMS;
        handleDataUpdate(data);
      },
      error: (error) => {
        console.error("Subscription data rms error:", error);
      },
    });
  } catch (error) {
    console.error("Error fetching data rms lastCreatedAt:", error);
  }
};

export default getDataRms;

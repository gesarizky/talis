import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postInverterData from "@/controller/device/inverter/post/PostInverterData";
import HistoryInverter from "@/model/history/inverter/inverter";

/**
 * @description mengambil data inverter dan mengolah data
 */


const getDataInverter = async () => {
  try {
    const timestamp = await HistoryInverter.max("createdAt");
    let lastCreatedAt = timestamp || "1970-01-01T00:00:00.000Z";

    const GET_INVERTER_SUBSCRIPTION = gql`
      subscription GetNewInverterData($lastSeenTimestamp: timestamptz!) {
        Inverter(where: { createdAt: { _gt: $lastSeenTimestamp } }) {
          UUID_User
          data
          id
          createdAt
          timestamp
        }
      }
    `;

    const handleDataUpdate = (data) => {
      // console.log("Received new inverter data:", data);

      const newDateLastCreatedAt = new Date(lastCreatedAt); // Konversi lastCreatedAt ke objek Date
      const newData = data.filter(
        (dataItem) => new Date(dataItem.createdAt) > newDateLastCreatedAt
      );

      let maxCreatedAt;

      if (newData.length > 0) {
        maxCreatedAt = new Date(newData[0].createdAt);
      } else {
        maxCreatedAt = undefined;
      }

      newData.forEach((dataItem) => {
        // console.log("Processing new inverter data:", dataItem);
        const createdAt = new Date(dataItem.createdAt);
        if (createdAt > maxCreatedAt) {
          maxCreatedAt = createdAt;
        }
        lastCreatedAt = maxCreatedAt.toISOString(); // Kembali konversi ke string ISO
        postInverterData(dataItem); // Process the data as needed
      });
    };

    const subscribeToInverter = () => {
      const subscription = apolloClient.subscribe({
        query: GET_INVERTER_SUBSCRIPTION,
        variables: {
          lastSeenTimestamp: lastCreatedAt,
        },
      });
      console.log("Attempting to connect inverter subscription...");
      subscription.subscribe({
        next: (result) => {
          const data = result.data.Inverter;
          handleDataUpdate(data);
        },
        error: (error) => {
          console.error("Subscription data inverter error:", error.message);
          // Retry subscribing when connection is lost
          setTimeout(subscribeToInverter, 20000); // Retry every * seconds (adjust as needed)
        },
      });
    };

    // Start subscribing when the program is first run
    subscribeToInverter();
  } catch (error) {
    console.error("Error fetching data inverter lastCreatedAt:", error.message);
  }
};

export default getDataInverter;



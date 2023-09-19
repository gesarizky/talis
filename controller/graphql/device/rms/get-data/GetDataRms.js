import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postRmsData from "@/controller/device/rms/post/PostRmsData";
import HistoryCellHealth from "@/model/history/rack/historyrms/HistoryCellHealth";

const getDataRms = async () => {
  try {
    const timestamp = await HistoryCellHealth.max("createdAt");
    let lastCreatedAt = timestamp || "1970-01-01T00:00:00.000Z";

    const GET_RMS_SUBCRIPTION = gql`
      subscription GetNewRmsData($lastSeenTimestamp: timestamptz!) {
        RMS(where: { createdAt: { _gt: $lastSeenTimestamp } }) {
          UUID_User
          data
          id
          createdAt
          timestamp
        }
      }
    `;

    const handleDataUpdate = (data) => {
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
        // console.log("Processing new rms data:", dataItem.UUID_User);
        const createdAt = new Date(dataItem.createdAt);
        if (createdAt > maxCreatedAt) {
          maxCreatedAt = createdAt;
        }
        lastCreatedAt = maxCreatedAt.toISOString(); // Kembali konversi ke string ISO
        postRmsData(dataItem);
      });
    };

    const subscribeToRms = () => {
      const subscription = apolloClient.subscribe({
        query: GET_RMS_SUBCRIPTION,
        variables: {
          lastSeenTimestamp: lastCreatedAt,
        },
      });
      console.log("Attempting to connect rms subscription...");
      subscription.subscribe({
        next: (result) => {
          const data = result.data.RMS;
          handleDataUpdate(data);
        },
        error: (error) => {
          console.error("Subscription data rms error:", error.message);
          // Coba kembali berlangganan saat sambungan terputus
          setTimeout(subscribeToRms, 20000); // Coba kembali setiap 5 detik (sesuaikan dengan kebutuhan Anda)
        },
      });
    };

    // Mulai berlangganan saat program pertama kali dijalankan
    subscribeToRms();
  } catch (error) {
    console.error("Error fetching data rms lastCreatedAt:", error.message);
  }
};

export default getDataRms;

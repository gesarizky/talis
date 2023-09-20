import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postMpptData from "@/controller/device/mppt/post/PostMpptData";
import HistoryMppt from "@/model/history/mppt/mppt";

/**
 * @description mengambil data mppt dan mengolah data
 */

const getDataMppt = async () => {
  try {
    const timestamp = await HistoryMppt.max("createdAt");
    let lastCreatedAt = timestamp || "1970-01-01T00:00:00.000Z";

    const GET_MPPT_SUBCRIPTION = gql`
      subscription GetNewMpptData($lastSeenTimestamp: timestamptz!) {
        MPPT(where: { createdAt: { _gt: $lastSeenTimestamp } }) {
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
        // console.log("Processing new mppt data:", dataItem.UUID_User);
        const createdAt = new Date(dataItem.createdAt);
        if (createdAt > maxCreatedAt) {
          maxCreatedAt = createdAt;
        }
        lastCreatedAt = maxCreatedAt.toISOString(); // Kembali konversi ke string ISO
        postMpptData(dataItem);
      });
    };

    const subscribeToMppt = () => {
      const subscription = apolloClient.subscribe({
        query: GET_MPPT_SUBCRIPTION,
        variables: {
          lastSeenTimestamp: lastCreatedAt,
        },
      });
      console.log("Attempting to connect mppt subscription...");
      subscription.subscribe({
        next: (result) => {
          const data = result.data.MPPT;
          handleDataUpdate(data);
        },
        error: (error) => {
          console.error("Subscription data mppt error:", error.message);
          // Coba kembali berlangganan saat sambungan terputus
          setTimeout(subscribeToMppt, 20000); // Coba kembali setiap * detik (sesuaikan dengan kebutuhan Anda)
        },
      });
    };

    // Mulai berlangganan saat program pertama kali dijalankan
    subscribeToMppt();
  } catch (error) {
    console.error("Error : ~ file GetDataMppt.js :", error.message);
  }
};

export default getDataMppt;

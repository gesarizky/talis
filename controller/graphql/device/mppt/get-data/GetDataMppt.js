import { gql } from "@apollo/client";
import { apolloClient } from "../../../apollo";
import postMpptData from "@/controller/device/mppt/post/PostMpptData";

const getDataMppt = async () => {
  try {
    const GET_LAST_CREATED_AT = gql`
      query GetLastCreatedAt {
        MPPT(limit: 1, order_by: { createdAt: desc }) {
          createdAt
        }
      }
    `;

    const lastCreatedAtResult = await apolloClient.query({
      query: GET_LAST_CREATED_AT,
    });

    let lastCreatedAt =
      lastCreatedAtResult.data.MPPT[0]?.createdAt || "1970-01-01T00:00:00.000Z"; // Jika tidak ada data, gunakan timestamp awal

    const GET_MPPT_SUBCRIPTION = gql`
      subscription GetNewMpptData($lastSeenTimestamp: timestamptz = "${lastCreatedAt}") {
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
        console.log("Processing new mppt data:", dataItem.UUID_User);
        if (dataItem.createdAt > maxCreatedAt) {
          maxCreatedAt = dataItem.createdAt;
        }
        lastCreatedAt = maxCreatedAt;
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
          setTimeout(subscribeToMppt, 5000); // Coba kembali setiap 5 detik (sesuaikan dengan kebutuhan Anda)
        },
      });
    };

    // Mulai berlangganan saat program pertama kali dijalankan
    subscribeToMppt();
  } catch (error) {
    console.error("Error fetching data mppt lastCreatedAt:", error.message);
  }
};

export default getDataMppt;

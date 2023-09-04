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
        }
      }
    `;

    const handleDataUpdate = (data) => {
      console.log("data non filter :", data);
      const newData = data.filter(
        (dataItem) => dataItem.createdAt > lastCreatedAt
      );
      newData.forEach((dataItem) => {
        console.log("Processing new data:", dataItem);
        console.log("Waktu yang di track", lastCreatedAt);
        lastCreatedAt = dataItem.createdAt;
        postMpptData(dataItem);
      });
    };

    const subscription = apolloClient.subscribe({
      query: GET_MPPT_SUBCRIPTION,
      variables: {
        lastSeenTimestamp: lastCreatedAt,
      },
    });

    subscription.subscribe({
      next: (result) => {
        const data = result.data.MPPT;
        handleDataUpdate(data);
      },
      error: (error) => {
        console.error("Subscription data mppt error:", error);
      },
    });
  } catch (error) {
    console.error("Error fetching data mppt lastCreatedAt:", error);
  }
};

export default getDataMppt;

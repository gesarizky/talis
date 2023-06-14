import { gql } from "@apollo/client";
import { apolloClient } from "./apollo";
import AddDataTodos from "../addDataTodos";
const getDataTodos = async () => {
  const GET_TODOS_SUBCRIPTION = gql`
    subscription {
      kalidua(order_by: { CreatedAt: desc }, limit: 1) {
        id
        nilai
      }
    }
  `;
  const handleDataUpdate = (data) => {
    // Olah data yang diperbarui di sini
    console.log(data);
    data.map((data) => AddDataTodos(data));
    // Lakukan aksi lain yang Anda perlukan
  };
  const subscription = apolloClient.subscribe({
    query: GET_TODOS_SUBCRIPTION,
  });
  subscription.subscribe({
    next: (result) => {
      const data = result.data.kalidua;
      handleDataUpdate(data);
    },
    error: (error) => {
      console.error("Subscription error:", error);
    },
  });
};
export default getDataTodos;

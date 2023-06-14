import AddDataTodos from "../addDataTodos";
export const getData = async () => {
  let todos;
  try {
    const response = await fetch(process.env.HASURA_PROJECT_ENDPOINT, {
      method: "POST",
      headers: {
        "x-hasura-admin-secret": "",
      },
      body: JSON.stringify({
        query: `query{
  todos{
    title
    id
  }
}`,
      }),
    });
    const result = await response.json();
    const data = result.data;
    todos = data.todos;
    const datatodo = data.todos;
    const datatodos = datatodo.map(
        // (data) => AddDataTodos(data)
        );
  } catch (error) {
    console.log(error);
  }
  return { todos };
};

export default getData;

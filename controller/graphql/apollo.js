import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: process.env.HASURA_PROJECT_HTTP_ENDPOINT,
  // uri: process.env.HASURA_LOCAL_PROJECT_HTTP_ENDPOINT,

  headers: {
    "x-hasura-admin-secret": "",
  },
});

const wsLink = new GraphQLWsLink(
  createClient({
    // url: process.env.HASURA_PROJECT_WS_ENDPOINT,
    url: process.env.HASURA_LOCAL_PROJECT_WS_ENDPOINT,
    connectionParams: {
      headers: {
        "x-hasura-admin-secret": "",
      },
    },
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);
export const apolloClient = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

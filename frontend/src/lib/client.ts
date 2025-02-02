import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  split,
  ApolloLink,
  fromPromise,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { getMainDefinition } from "@apollo/client/utilities";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL,
  credentials: "include",
});

const wsLink = new WebSocketLink({
  uri: process.env.NEXT_PUBLIC_API_WS_URL!,
  options: {
    reconnect: true,
  },
});

const link = split(
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

const client = new ApolloClient({
  ssrMode: true,
  link,
  cache: new InMemoryCache(),
});

export default client;

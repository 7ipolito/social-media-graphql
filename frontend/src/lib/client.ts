import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { link } from "fs";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL, // URL do seu servidor GraphQL
  credentials: "include", // Inclui cookies em todas as requisições
});

const client = new ApolloClient({
  ssrMode: true,
  link: httpLink,
  cache: new InMemoryCache(),
});

export default client;

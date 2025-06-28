import { HttpLink, InMemoryCache, ApolloClient } from "@apollo/client";

let client: ApolloClient<any> | null = null;

export function getClient() {
  if (!client) {
    client = new ApolloClient({
      cache: new InMemoryCache(),
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_API || process.env.API || 'https://h4c-api.rabbithole.carrotly.tech/graphql',
      }),
    });
  }
  return client;
}

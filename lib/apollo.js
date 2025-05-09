import { ApolloClient, InMemoryCache } from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://astralpaints.kwebmakerdigitalagency.com/graphql',
  cache: new InMemoryCache(),
});
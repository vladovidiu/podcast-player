import {ApolloClient, InMemoryCache} from '@apollo/client';

export const client = new ApolloClient({
  uri: 'https://go-podcast.herokuapp.com/query',
  cache: new InMemoryCache(),
});

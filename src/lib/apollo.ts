import {
  ApolloClient,
  InMemoryCache,
  NormalizedCacheObject,
  HttpLink,
} from '@apollo/client';
/* import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities'; */

export default function createApolloClient() {
  // const token = localStorage.getItem('nblogtoken');
  const httpLink = new HttpLink({
    uri: 'http://localhost:5001/graphql',
  });

  /* const wsLink = process.browser
    ? new WebSocketLink({
        uri: 'ws://localhost:5001/graphql',
        options: {
          reconnect: true,
          connectionParams: {
            // Authorization: token ? `Bearer ${token}` : '',
          },
        },
      })
    : null;

  const link = process.browser
    ? split(
        ({ query }) => {
          const definition = getMainDefinition(query);
          return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
          );
        },
        wsLink,
        httpLink
      )
    : httpLink; */

  return new ApolloClient({
    ssrMode: typeof window === 'undefined',
    link: httpLink,
    cache: new InMemoryCache(),
  });
}

let apolloClient: ApolloClient<NormalizedCacheObject>;

export function initializeApollo() {
  const _apolloClient = apolloClient ?? createApolloClient();
  if (typeof window === 'undefined') return _apolloClient;
  if (!apolloClient) apolloClient = _apolloClient;
  return _apolloClient;
}

export function useApollo() {
  return initializeApollo();
}

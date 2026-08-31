import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  from,
  InMemoryCache,
  split,
} from '@apollo/client';
import { getMainDefinition } from '@apollo/client/utilities';
import { onError } from '@apollo/client/link/error';
import { RetryLink } from '@apollo/client/link/retry';
import { createUploadLink } from 'apollo-upload-client';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';

import { Errorhandler, parseServerErrorMsg } from '@src/lib/utils/error';

import {
  API_HTTP_ADDRESS,
  NOTIFICATION_WS_ADDRESS,
} from '@src/lib/constants/urls';
import i18n from '@lib/i18n';
import { navigateTo } from '@src/lib/navigation';
import { getSubscriptionAccessToken } from '@src/store/zustand/user/token';

const SERVICE_TYPE = 'modiplanet';

/**
 * Apllo
 */
const uploadLink: any = createUploadLink({
  uri: API_HTTP_ADDRESS,
  credentials: 'include',
  // fetch: typeof window === 'undefined' ? (global.fetch as any) : customFetch,
});

const retryLink = new RetryLink({
  delay: {
    initial: 300,
    max: Infinity,
    jitter: true,
  },
  attempts: {
    max: 3,
    retryIf: (error) => !!error,
  },
});

const onErrorLink = onError((res) => {
  const handler = new Errorhandler(res);
  const errors = handler.getErrors();
  errors.forEach(([code, msg]) => {
    switch (code) {
      case 1000: {
        alert(i18n.t('COMMON_ERROR_MSG'));
        navigateTo('/signin');
        console.error(msg);
        break;
      }
    }
  });
});

const authLink = new ApolloLink((operation, forward) => {
  operation.setContext(({ headers }) => {
    return {
      headers: {
        service: SERVICE_TYPE,
        ['Accept-Language']: i18n.language,
        ...headers,
      },
    };
  });
  return forward(operation);
});

const additiveLink = from([authLink, onErrorLink, retryLink, uploadLink]);

const wsLink = new GraphQLWsLink(
  createClient({
    url: NOTIFICATION_WS_ADDRESS,
    connectionParams: () => {
      const accessToken = getSubscriptionAccessToken();
      return {
        service: SERVICE_TYPE,
        'Accept-Language': i18n.language,
        ...(accessToken && { Authorization: accessToken }),
      };
    },
    retryAttempts: 3,
    shouldRetry: () => true,
  }),
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  additiveLink,
);

export const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
  credentials: 'include',

  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'network-only',
    },
    query: {
      fetchPolicy: 'network-only',
    },
  },
});

interface IApolloProps {
  children: JSX.Element;
}

function Apollo({ children }: IApolloProps): JSX.Element {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

export default Apollo;

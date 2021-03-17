import '../styles/globals.css';
import 'nprogress/nprogress.css';
import 'moment/locale/tr';
import { AppProps } from 'next/app';
import { Router } from 'next/router';
import { ApolloProvider } from '@apollo/client';
import NP from 'nprogress';
import { useApollo } from '../lib/apollo';

Router.events.on('routeChangeStart', () => NP.start());
Router.events.on('routeChangeComplete', () => NP.done());
Router.events.on('routeChangeError', () => NP.done());

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo();
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;

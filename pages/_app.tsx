import "../styles/globals.css";
import type { AppProps } from "next/app";
import Navbar from "../app/components/navbar/navbar";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <div className="max-w-7xl mx-auto">
        <Navbar />
        <Component {...pageProps} />
      </div>
    </ApolloProvider>
  );
}

export default MyApp;

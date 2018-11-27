import ApolloClient from "apollo-boost";
import * as React from "react";
import { ApolloProvider } from "react-apollo";
import { render } from "react-dom";
import Profile from "./Profile";

const client = new ApolloClient({
  uri: "https://www.graphqlhub.com/graphql"
});

const App = () => (
  <ApolloProvider client={client}>
    <Profile />
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));

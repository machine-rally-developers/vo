import ApolloClient from "apollo-boost";
//Apollo client connection
let uri = "/graphql";
const client = new ApolloClient({
  uri
});
let generalSettings = {
  appName: "Virtual Orchestration"
};
export { client, generalSettings };

import * as graphql from "graphql";
import {
  listInstalledModules,
  deleteInstalledModule,
  getInstalledModulesById
} from "./modules-shema/installed-modules";
const { GraphQLObjectType, GraphQLSchema } = graphql;
//root querys
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: { listInstalledModules }
});
//root mutation.
const rootMutation = new GraphQLObjectType({
  name: "rootMutation",
  fields: { deleteInstalledModule, getInstalledModulesById }
});
const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
});
export default schema;

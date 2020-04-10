import * as graphql from "graphql";
import {
  listInstalledModules,
  deleteInstalledModule,
  getInstalledModuleById,
  addVariable,
  deleteVariable
} from "./modules-shema/installed-modules";
import { conversation } from "./conversation-schema/conversation-schema";
const { GraphQLObjectType, GraphQLSchema } = graphql;
//root querys
const rootQuery = new GraphQLObjectType({
  name: "rootQuery",
  fields: { listInstalledModules, getInstalledModuleById }
});

//root mutation.
const rootMutation = new GraphQLObjectType({
  name: "rootMutation",
  fields: { deleteInstalledModule, addVariable, deleteVariable, conversation }
});
const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
});
export default schema;

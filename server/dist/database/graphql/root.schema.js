"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
exports.__esModule = true;
var graphql = __importStar(require("graphql"));
var installed_modules_1 = require("./modules-shema/installed-modules");
var conversation_schema_1 = require("./conversation-schema/conversation-schema");
var GraphQLObjectType = graphql.GraphQLObjectType, GraphQLSchema = graphql.GraphQLSchema;
//root querys
var rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: { listInstalledModules: installed_modules_1.listInstalledModules, getInstalledModuleById: installed_modules_1.getInstalledModuleById }
});
//root mutation.
var rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: { deleteInstalledModule: installed_modules_1.deleteInstalledModule, addVariable: installed_modules_1.addVariable, deleteVariable: installed_modules_1.deleteVariable, conversation: conversation_schema_1.conversation }
});
var schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});
exports["default"] = schema;
//# sourceMappingURL=root.schema.js.map
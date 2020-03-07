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
var GraphQLObjectType = graphql.GraphQLObjectType, GraphQLSchema = graphql.GraphQLSchema;
//root querys
var rootQuery = new GraphQLObjectType({
    name: "rootQuery",
    fields: { listInstalledModules: installed_modules_1.listInstalledModules }
});
//root mutation.
var rootMutation = new GraphQLObjectType({
    name: "rootMutation",
    fields: { deleteInstalledModule: installed_modules_1.deleteInstalledModule, getInstalledModulesById: installed_modules_1.getInstalledModulesById }
});
var schema = new GraphQLSchema({
    query: rootQuery,
    mutation: rootMutation
});
exports["default"] = schema;
//# sourceMappingURL=root.schema.js.map
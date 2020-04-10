import * as graphql from "graphql";
import GetInstalledModules from "../../mongoose/crud/module.read";
import DeleteInstalledModule from "../../mongoose/crud/module.delete";
import DeleteVariable from "../../mongoose/crud/variable.delete";
import CreateVariable from "../../mongoose/crud/variable.create";
import boom from "boom";
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
} = graphql;
/**
 * This variable defines the property of a module
 */
const variableType = new GraphQLObjectType({
  name: "variables",
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    key: {
      type: GraphQLString
    },
    value: {
      type: GraphQLString
    }
  })
});
const moduleType = new GraphQLObjectType({
  name: "modules",
  fields: () => ({
    _id: {
      type: GraphQLID
    },
    description: {
      type: GraphQLString
    },
    licence: {
      type: GraphQLString
    },
    email: {
      type: GraphQLID
    },
    summary: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    packageName: {
      type: GraphQLID
    },
    authors: {
      type: new GraphQLList(GraphQLString)
    },
    tags: {
      type: new GraphQLList(GraphQLString)
    },
    triggers: {
      type: new GraphQLList(GraphQLString)
    },
    variables: {
      type: new GraphQLList(variableType)
    }
  })
});

const listInstalledModules = {
  type: new GraphQLList(moduleType),
  async resolve(parents, args) {
    let result = await GetInstalledModules({});
    return result;
  }
};
const getInstalledModuleById = {
  type: new GraphQLList(moduleType),
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(parents, args) {
    let result = await GetInstalledModules({ _id: args.id });
    return result;
  }
};
const deleteInstalledModule = {
  type: moduleType,
  args: {
    id: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(parents, args) {
    try {
      let result = await DeleteInstalledModule(args.id);
      return result;
    } catch (e) {
      let error = new GraphQLError(e.message);
      return boom.boomify(error, { statusCode: 400 }).output;
    }
  }
};
const deleteVariable = {
  type: moduleType,
  args: {
    variableId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    moduleId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(parents, args) {
    try {
      let result = await DeleteVariable(args.variableId, args.moduleId);
      return result;
    } catch (e) {
      let error = new GraphQLError(e.message);
      return boom.boomify(error, { statusCode: 400 }).output;
    }
  }
};
const addVariable = {
  type: moduleType,
  args: {
    key: {
      type: new GraphQLNonNull(GraphQLString)
    },
    value: {
      type: new GraphQLNonNull(GraphQLString)
    },
    moduleId: {
      type: new GraphQLNonNull(GraphQLID)
    }
  },
  async resolve(parents, args) {
    interface Variables {
      key: string;
      value: string;
    }
    let payload: Variables = { key: args.key, value: args.value };
    try {
      let result = await CreateVariable(payload, args.moduleId);
      return result;
    } catch (e) {
      let error = new GraphQLError(e.message);
      return boom.boomify(error, { statusCode: 400 }).output;
    }
  }
};
export {
  listInstalledModules,
  deleteInstalledModule,
  getInstalledModuleById,
  addVariable,
  deleteVariable
};

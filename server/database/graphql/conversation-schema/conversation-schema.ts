/**
 *Schema for front end question
 */
import * as graphql from "graphql";
import GetInstalledModules from "../../mongoose/crud/module.read";
import DeleteInstalledModule from "../../mongoose/crud/module.delete";
import DeleteVariable from "../../mongoose/crud/variable.delete";
import CreateVariable from "../../mongoose/crud/variable.create";
import boom from "boom";
import { askQuestion } from "../../../controllers/vo-client/vo.client.controller";
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLList,
  GraphQLNonNull,
  GraphQLError
} = graphql;
const conversationType = new GraphQLObjectType({
  name: "conversation",
  fields: () => ({
    question: {
      type: GraphQLString
    },
    answer: { type: GraphQLString }
  })
});
const conversation = {
  type: conversationType,
  args: {
    question: {
      type: GraphQLNonNull(GraphQLString)
    }
  },
  async resolve(parent, args) {
    try {
      let result = await askQuestion(args.question);
      return result;
    } catch (e) {
      let error = new GraphQLError(e.message);
      return boom.boomify(error, { statusCode: 400 }).output;
    }
  }
};
export { conversation };

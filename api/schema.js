// @flow
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLInt,
  GraphQLString
} from "graphql";

import { fromGlobalId, globalIdField, nodeDefinitions } from "graphql-relay";

import { User, Address } from "./model";

const user = new User(
  42,
  "bastien",
  new Address(113, "rue Saint-Maur", 75011, "Paris")
);

const { nodeInterface, nodeField } = nodeDefinitions(
  globalId => {
    const { type } = fromGlobalId(globalId);
    if (type === "User") {
      return user;
    }
    return null;
  },
  obj => {
    if (obj instanceof User) {
      return GraphQLUser;
    }
    return null;
  }
);

const GraphQLAddress = new GraphQLObjectType({
  name: "Address",
  fields: {
    number: {
      type: GraphQLNonNull(GraphQLInt)
    },
    street: {
      type: GraphQLNonNull(GraphQLString)
    },
    zip: {
      type: GraphQLNonNull(GraphQLInt)
    },
    city: {
      type: GraphQLNonNull(GraphQLString)
    }
  }
});

const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: globalIdField("User"),
    name: {
      type: GraphQLNonNull(GraphQLString)
    },
    address: {
      type: GraphQLNonNull(GraphQLAddress)
    }
  },
  interfaces: [nodeInterface]
});

const Query = new GraphQLObjectType({
  name: "Query",
  fields: {
    user: {
      type: GraphQLNonNull(GraphQLUser),
      resolve: () => user
    },
    node: nodeField
  }
});

export const schema = new GraphQLSchema({
  query: Query
});

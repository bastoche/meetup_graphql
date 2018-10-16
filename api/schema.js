// @flow
import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLString
} from "graphql";

import { fromGlobalId, globalIdField, nodeDefinitions } from "graphql-relay";
export class User {
  id: number;
  name: string;

  constructor(id: number, name: string) {
    this.id = id;
    this.name = name;
  }
}

const user = new User(42, "bastien");

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

const GraphQLUser = new GraphQLObjectType({
  name: "User",
  fields: {
    id: globalIdField("User"),
    name: {
      type: GraphQLNonNull(GraphQLString)
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

// finally, the schema
export const schema = new GraphQLSchema({
  query: Query
});

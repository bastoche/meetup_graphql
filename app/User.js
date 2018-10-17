// @flow

import React from "react";
import { graphql, QueryRenderer } from "react-relay";

import { type UserQueryResponse } from "./__generated__/UserQuery.graphql";

import environment from "./environment";

const query = graphql`
  query UserQuery {
    user {
      first_name: name
    }
  }
`;

export default class User extends React.Component<{||}> {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{}}
        render={({
          error,
          props
        }: {
          error: ?Error,
          props: ?UserQueryResponse
        }) => {
          if (error) {
            return <div>Error!</div>;
          }
          if (!props) {
            return <div>Loading...</div>;
          }
          return (
            <div>
              <div>User: {props.user.first_name}</div>
            </div>
          );
        }}
      />
    );
  }
}

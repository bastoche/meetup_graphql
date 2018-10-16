// @flow

import React from "react";
import { graphql, QueryRenderer } from "react-relay";

import { type UserQueryResponse } from "./__generated__/UserQuery.graphql";

import environment from "./environment";

export default class User extends React.Component<{||}> {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={graphql`
          query UserQuery {
            user {
              name
            }
          }
        `}
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
              <div>User: {props.user.name}</div>
            </div>
          );
        }}
      />
    );
  }
}

// @flow

import React from "react";
import { graphql, QueryRenderer } from "react-relay";

import { type UserQueryResponse } from "./__generated__/UserQuery.graphql";

import environment from "./environment";

const query = graphql`
  query UserQuery($withAddress: Boolean!) {
    user {
      first_name: name
      address @include(if: $withAddress) {
        zip
      }
    }
  }
`;

export default class User extends React.Component<{||}> {
  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={query}
        variables={{ withAddress: false }}
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
              {props.user.address ? (
                <div>Zip: {props.user.address.zip}</div>
              ) : null}
            </div>
          );
        }}
      />
    );
  }
}

import gql from "graphql-tag";
import * as React from "react";
import { Query } from "ts-react-apollo";
import assertNever from "./assertNever";

const getProfile = gql`
  {
    github {
      user(username: "eversport") {
        login
        avatar_url
      }
    }
  }
`;

interface IProfileData {
  github: {
    user: {
      avatar_url: string;
      login: string;
    };
  };
}

const Profile = () => (
  <Query<IProfileData> query={getProfile}>
    {({ result }) => {
      switch (result.type) {
        case "loading":
          return "Loading …";
        case "error":
          return "Sorry, something went wrong";
        case "data":
          return (
            <div>
              <img
                src={result.data.github.user.avatar_url}
                alt={`${result.data.github.user.login} Avatar`}
              />
            </div>
          );
        default:
          return assertNever(result);
      }
    }}
  </Query>
);

export default Profile;

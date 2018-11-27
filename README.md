## TypeScript React Apollo

Using TypeScript we can get way more out of GraphQL than with JavaScript. But we can go even further than just typing return values. We should structure our APIs to support TypeScript in what it does best: make our life as a developer easier.

## API

### Query

Instead of returning `data`, `loading` and `error` it returns a result which is a Discriminated Union with the property `type` being the discriminant. Why? Because these states can't happen at the same time. loading and error for example can never be true at the same time.

```
import React from "react";
import gql from "graphql-tag";
import { Query } from "ts-react-apollo";

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

const Profile = () => (
  <Query query={getProfile}>
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
      }
    }}
  </Query>
);

export default Profile;
```

You can find the working example here https://codesandbox.io/s/0qx7ovkzvn

## Todo
- [ ] Add Readme
- [ ] Add API documentation
- [ ] Add tests
- [ ] Add examples
- [ ] Add a license

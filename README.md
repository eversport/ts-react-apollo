## TypeScript React Apollo

This package uses react-apollo under the hood, but does change the result type to tailer it to make use of helpful TypeScript features for a better developer experience. For example using exhaustive matching against Discriminated Unions for the Query render prop.

## Installation

https://www.npmjs.com/package/ts-react-apollo

```
npm i ts-react-apollo
# in case you prefer yarn use
yarn add ts-react-apollo
```

If you would like us to support other ways of using ts-react-apollo please open an issue.

## API

### Query

Instead of returning `data`, `loading` and `error` it returns a result which is a Discriminated Union with the property `type` being the discriminant. Why? Because these states can't happen at the same time. loading and error for example can never be true at the same time.

Using a switch statment with an assetNever default case we can do exhaustive checking on all the possible states.

```jsx
interface ProfileData {
  github: {
    user: {
      avatar_url: string;
      login: string;
    };
  };
}

const Profile = () => (
  <Query<ProfileData> query={getProfile}>
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
```

You can find the working example in the repository.

## Todo
- [ ] Add API documentation
- [ ] Add tests
- [x] Add a license

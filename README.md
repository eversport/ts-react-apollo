## TypeScript React Apollo

Using TypeScript we can get way more out of GraphQL than with JavaScript. But we can go even further than just typing return values. We should structure our APIs to support TypeScript in what it does best: make our life as a developer easier.

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

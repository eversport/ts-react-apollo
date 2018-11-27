## TypeScript Apollo

Using TypeScript we can get way more out of GraphQL than with JavaScript. But we can go even further than just typing return values. We should structure our APIs to support TypeScript in what it does best: make our life as a developer easier.

## API

### Query

Instead of returning `data`, `loading` and `error` it turns a Discriminated Unions with the property `xyz` being the discriminant.

```
import { Query } from "ts-react-apollo";
```

## Todo
- [ ] Add Readme
- [ ] Add API documentation
- [ ] Add tests
- [ ] Add examples

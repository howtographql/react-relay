# React & Relay Tutorial

This is the sample project that belongs to the [React & Relay Tutorial]() on How to GraphQL.

## Running the App

### 1. Clone repository

```sh
git clone https://github.com/howtographql/react-relay/
cd react-relay
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

```sh
# Install Graphcool CLI
npm install -g graphcool

# Create a new project based on the Instagram schema
graphcool init --schema https://graphqlbin.com/hn-relay.graphql 
```

This creates a GraphQL API for the following schema:

```graphql

type User {
  name: String!
  links: [Link!] @relation(name: "UsersLinks")
  votes: [Vote!] @relation(name: "UsersVotes")
}

type Link { 
  url: String!
  description: String!
  postedBy: User @relation(name: "UsersLinks")
  votes: [Vote!] @relation(name: "VotesOnLink")
}

type Vote {
  user: User @relation(name: "UsersVotes")
  link: Link @relation(name: "VotesOnLink")
}
```

### 3. Connect the app with your GraphQL API

Copy the project ID (which you find in the generated `project.graphcool` file) into `./src/Environment.js` ` replacing the `__PROJECT_ID__`.

Notice that you need to this _twice_, once inside `fetchQuery` and once inside `setupSubscription`.

### 4. Install dependencies & run locally

```sh
yarn install
relay-compiler --src ./src --schema ./schema.graphql
yarn start # open http://localhost:3000 in your browser
```



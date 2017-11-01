# React & Relay Tutorial

This is the sample project that belongs to the [React & Relay Tutorial](https://www.howtographql.com/react-relay/0-introduction/) on How to GraphQL.

## Running the App

### 1. Clone repository

```sh
git clone https://github.com/howtographql/react-relay/
cd react-relay
```

### 2. Create GraphQL API with [`graphcool`](https://www.npmjs.com/package/graphcool)

If you haven't already, install the Graphcool CLI:

```sh
# Install Graphcool CLI
npm install -g graphcool
```

Once it's installed, you can deploy the Graphcool service based on the existing definition inside the [`server`](./server) directory:

```sh
cd server
graphcool deploy
```

When prompted, choose any of the **Shared Clusters** deplyoment options.

### 3. Connect the app with your GraphQL API

Copy the service ID (which you find in the generated `.graphcoolrc` file inside the `server` directory or by running `graphcool info`) into `./src/Environment.js` replacing the current placeholder `__SERVICE_ID__`. 

Notice that you need to this _twice_, once inside `fetchQuery` and once inside `setupSubscription`.

### 5. Install dependencies & run locally

```sh
yarn install
relay-compiler --src ./src --schema ./schema.graphql
yarn start # open http://localhost:3000 in your browser
```



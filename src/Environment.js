import { SubscriptionClient } from 'subscriptions-transport-ws'

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')
const store = new Store(new RecordSource())


const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/cj43uccaa2u5r0185uqqv6lm1', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const websocketURL = 'wss://subscriptions.graph.cool/v1/cj43uccaa2u5r0185uqqv6lm1'

function setupSubscription(
  config,
  variables,
  cacheConfig,
  observer,
) {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(websocketURL, {reconnect: true})
  subscriptionClient.subscribe({query, variables}, (error, result) => {
    observer.onNext({data: result})
  })
}


const network = Network.create(fetchQuery, setupSubscription)

const environment = new Environment({
  network,
  store,
})

export default environment


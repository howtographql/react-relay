import {GC_AUTH_TOKEN} from './constants'
import { SubscriptionClient } from 'subscriptions-transport-ws'

const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')

const store = new Store(new RecordSource())

export const fetchQuery = (operation, variables) => {
  return fetch('https://api.graph.cool/relay/v1/__SERVICE_ID__', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem(GC_AUTH_TOKEN)}`
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

const setupSubscription = (config, variables, cacheConfig, observer) => {
  const query = config.text

  const subscriptionClient = new SubscriptionClient(
    'wss://subscriptions.__REGION__.graph.cool/v1/__PROJECT_ID__',
    {reconnect: true}
  )

  const client = subscriptionClient
    .request({query, variables})
    .subscribe({
      next: (result) => {
        observer.onNext({data: result.data})
      },
      complete: () => {
        observer.onCompleted()
      },
      error: (error) => {
        observer.onError(error)
      }
    })

  return {
    dispose: client.unsubscribe
  }
}

const network = Network.create(fetchQuery, setupSubscription)

const environment = new Environment({
  network,
  store,
})

export default environment


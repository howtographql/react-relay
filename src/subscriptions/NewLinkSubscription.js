import {
  graphql,
  requestSubscription
} from 'react-relay'
import environment from '../Environment'

const newLinkSubscription = graphql`
  subscription NewLinkSubscription {
    Link {
      mutation
      node {
        id
        description
        url
        createdAt
        postedBy {
          id
          name
        }
      }
    }
  }
`

export default (updater, onError) => {

  const subscriptionConfig = {
    subscription: newLinkSubscription,
    variables: {},
    updater,
    onError
  }

  requestSubscription(
    environment,
    subscriptionConfig
  )

}

// export default (onNext, onError, onCompleted, updater) => {
//
//   const subscriptionConfig = {
//     subscription: newLinkSubscription,
//     variables: {},
//     onError,
//     onNext,
//     onCompleted,
//     updater
//   }
//
//   requestSubscription(
//     environment,
//     subscriptionConfig
//   )
//
// }
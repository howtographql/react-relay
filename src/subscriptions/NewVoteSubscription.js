import {
  graphql,
  requestSubscription
} from 'react-relay'
import environment from '../Environment'

const newVoteSubscription = graphql`
  subscription NewVoteSubscription {
    Vote {
      mutation
      node {
        id
        link {
          id
          _votesMeta {
            count
          }
        }
        user {
          id
        }        
      }
    }
  }
`

export default (updater, onError) => {

  const subscriptionConfig = {
    subscription: newVoteSubscription,
    variables: {},
    updater,
    onError
  }

  requestSubscription(
    environment,
    subscriptionConfig
  )

}
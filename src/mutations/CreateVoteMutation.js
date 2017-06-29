import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'
import { ConnectionHandler } from 'relay-runtime'
import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger'

const mutation = graphql`
  mutation CreateVoteMutation($input: CreateVoteInput!) {
    createVote(input: $input) {
      vote {
        id
        link {
          id
          votes {
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

let tempID = 0

function getOptimisticResponse(userId, linkId, ) {
  return {
    createVote: {
      vote: {
        id: 'vote-' + tempID++,
        user: {
          id: userId
        },
        link: {
          id: linkId,
          votes: {
            count: -1
          }
        }

      }
    }
  }
}

export default (userId, linkId, viewerId) => {
  const variables = {
    input: {
      userId,
      linkId,
      clientMutationId: ""
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      // optimisticResponse: () => getOptimisticResponse(userId, linkId),
      optimisticUpdater: proxyStore => {

        // actual optimisticUpdater function
        const link = proxyStore.get(linkId)
        const currentVotes = link.getLinkedRecord('votes').getValue('count')
        const newVotes = currentVotes + 1
        link.getLinkedRecord('votes').setValue(newVotes, 'count')
        console.log( `updater, vote count: `, link.getLinkedRecord('votes').getValue('count'))

      },
      updater: proxyStore => {

        // const createVoteField = proxyStore.getRootField('createVote')
        // const newVote = createVoteField.getLinkedRecord('vote')
        // const updatedLink = newVote.getLinkedRecord('link')
        // const newVotes = updatedLink.getLinkedRecord('votes')
        // const newVoteCount = newVotes.getValue('count')
        //
        // const link = proxyStore.get(linkId)
        // link.getLinkedRecord('votes').setValue(newVoteCount, 'count')

      },
      onCompleted: () => {

      },
      onError: err => console.error(err),
    },
  )
}
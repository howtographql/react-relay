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
        }
        user {
          id
        }
# adding this payload to the query makes the cache update correctly
#        link {
#          votes {
#            edges {
#              node {
#                id
#                user {
#                  id
#                }
#              }
#            }
#          }
#        }
      }
    }
  }
`

let tempID = 0

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
      optimisticUpdater: proxyStore => {

        // const user = proxyStore.get(userId)
        // const link = proxyStore.get(linkId)
        //
        // const id = 'client:newVote:' + tempID++
        // const newVote = proxyStore.create(id, 'Vote')
        // newVote.setValue(id, 'id')
        // newVote.setLinkedRecord(user, 'user')
        // newVote.setLinkedRecord(link, 'link')
        //
        // const viewerProxy = proxyStore.get(viewerId)
        // const connection = ConnectionHandler.getConnection(viewerProxy, 'Link_votes')
        // if (connection) {
        //   ConnectionHandler.insertEdgeAfter(connection, newVote)
        // }

      },
      updater: proxyStore => {
        console.log(`CreateVoteMutation - updater`)
        storeDebugger.dump(proxyStore)

        const createVoteField = proxyStore.getRootField('createVote')
        const newVote = createVoteField.getLinkedRecord('vote')

        const viewerProxy = proxyStore.get(viewerId)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'Link_votes')

        console.log(`updater: `, viewerId, viewerProxy, connection)

        if (connection) {
          console.log(`insert new vote into connection: `, newVote)
          ConnectionHandler.insertEdgeAfter(connection, newVote)
        } else {
          console.log(`could not retrieve connection from ConnectionHandler`)
        }
      },
      onCompleted: () => {

      },
      onError: err => console.error(err),
    },
  )
}
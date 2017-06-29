import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'
import { ConnectionHandler } from 'relay-runtime'
import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger'

const mutation = graphql`
  mutation CreateLinkMutation($input: CreateLinkInput!) {
    createLink(input: $input) {
      link {
        id
        createdAt
        url
        description
        postedBy {
          id
          name
        }
      }
    }
  }
`

let tempID = 0

export default (postedById, description, url, viewerId, callback) => {
  const variables = {
    input: {
      postedById,
      description,
      url,
      clientMutationId: ""
    },
  }

  commitMutation(
    environment,
    {
      mutation,
      variables,
      optimisticUpdater: (proxyStore) => {

        // const id = 'client:newLink:' + tempID++
        // const newLink = proxyStore.create(id, 'Link')
        // newLink.setValue(id, 'id')
        // newLink.setValue(description, 'description')
        // newLink.setValue(url, 'url')
        //
        // const viewerProxy = proxyStore.get(viewerId)
        // const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allLinks')
        // if (connection) {
        //   ConnectionHandler.insertEdgeAfter(connection, newLink)
        // }
      },
      updater: (proxyStore) => {
        console.log(`CreateLinkMutation - updater`)
        storeDebugger.dump(proxyStore)


        const createLinkField = proxyStore.getRootField('createLink')
        const newLink = createLinkField.getLinkedRecord('link')

        const viewerProxy = proxyStore.get(viewerId)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allLinks', {
          orderBy: 'createdAt_DESC',
          last: 100
        })
        if (connection) {
          console.log(`insert new link into connection`, newLink)
          ConnectionHandler.insertEdgeAfter(connection, newLink)
        } else {
          console.log(`could not retrieve connection from ConnectionHandler - newLink:`, newLink)
        }
      },
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}
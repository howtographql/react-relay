import {
  commitMutation,
  graphql
} from 'react-relay'
import environment from '../Environment'
import { ConnectionHandler } from 'relay-runtime'

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

export default (description, url, viewerId, callback) => {
  const variables = {
    input: {
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

        const id = 'client:newLink:' + tempID++
        const newLink = proxyStore.create(id, 'Link')
        newLink.setValue(id, 'id')
        newLink.setValue(description, 'description')
        newLink.setValue(url, 'url')

        const viewerProxy = proxyStore.get(viewerId)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allLinks')
        if (connection) {
          ConnectionHandler.insertEdgeAfter(connection, newLink)
        }
      },
      updater: (proxyStore) => {
        const createLinkField = proxyStore.getRootField('createLink')
        const newLink = createLinkField.getLinkedRecord('link')

        const viewerProxy = proxyStore.get(viewerId)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allLinks')
        if (connection) {
          ConnectionHandler.insertEdgeAfter(connection, newLink)
        }
      },
      onCompleted: () => {
        callback()
      },
      onError: err => console.error(err),
    },
  )
}
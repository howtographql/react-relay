import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import Link from './Link'
// import NewLinkSubscription from '../subscriptions/NewLinkSubscription'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'
import storeDebugger from 'relay-runtime/lib/RelayStoreProxyDebugger'
import '../styles/index.css'


class LinkList extends Component {

  componentDidMount() {
    // NewLinkSubscription(
    //   proxyStore => {
    //     const linkField = proxyStore.getRootField('Link')
    //     const newLink = linkField.getLinkedRecord('node')
    //     const viewerProxy = proxyStore.get(this.props.viewer.id)
    //     const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allLinks')
    //     if (connection) {
    //       console.log(`Insert node into connection: `, newLink)
    //       ConnectionHandler.insertEdgeAfter(connection, newLink)
    //     }
    //   },
    //   error => console.log(`An error occured:`, error),
    // )
    // NewVoteSubscription(
    //   proxyStore => {
    //     console.log(`LinkList - NewVoteSubscription - updater`)
    //     storeDebugger.dump(proxyStore)
    //     const voteField = proxyStore.getRootField ('Vote')
    //     const newVote = voteField.getLinkedRecord ('node')
    //     console.log(`new vote`, newVote)
    //     const viewerProxy = proxyStore.get(this.props.viewer.id)
    //     const connection = ConnectionHandler.getConnection(viewerProxy, 'Link_votes', {
    //       last: 1000,
    //       orderBy: "createdAt_DESC"
    //     })
    //     if (connection) {
    //       console.log(`Insert node into connection: `, newVote)
    //       ConnectionHandler.insertEdgeAfter(connection, newVote)
    //     }
    //   },
    //   error => console.log(`An error occured:`, error),
    // )
  }

  render() {
    return (
      <div>
        {this.props.viewer.allLinks.edges.map(({node}, index) =>
          {
            console.log(`render node: `, node)
            return <Link key={node.id} index={index} link={node} viewer={this.props.viewer} />
          }
        )}
      </div>
    )
  }

}

export default createFragmentContainer(LinkList, graphql`
  fragment LinkList_viewer on Viewer {
    id
    ...Link_viewer
    allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: ["last", "orderBy"]) {
      edges {
        cursor
        node {
          ...Link_link
        }
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`)

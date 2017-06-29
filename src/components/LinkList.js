import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import { ConnectionHandler } from 'relay-runtime'
import Link from './Link'
import NewLinkSubscription from '../subscriptions/NewLinkSubscription'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'
import '../styles/index.css'

class LinkList extends Component {

  async componentDidMount() {
    NewLinkSubscription(
      proxyStore => {
        const linkField = proxyStore.getRootField('Link')
        const newLink = linkField.getLinkedRecord('node')
        const votesMeta = newLink.getLinkedRecord('_votesMeta')
        const currentCount = votesMeta.getValue('count')

        const votes = proxyStore.create('asd', 'VoteConnection')
        votes.setValue(currentCount, 'count')
        newLink.setLinkedRecord(votes, 'votes')

        const viewerProxy = proxyStore.get(this.props.viewer.id)
        const connection = ConnectionHandler.getConnection(viewerProxy, 'LinkList_allLinks', {
          last: 100,
          orderBy: 'createdAt_DESC'
        })
        if (connection) {
          const edge = ConnectionHandler.createEdge(proxyStore, connection, newLink, 'allLinks')
          ConnectionHandler.insertEdgeBefore(connection, edge)
        }
      },
      error => console.log(`An error occured:`, error),
    )
    NewVoteSubscription(
      proxyStore => {
        const createVoteField = proxyStore.getRootField('Vote')
        const newVote = createVoteField.getLinkedRecord('node')
        const updatedLink = newVote.getLinkedRecord('link')
        const linkId =  updatedLink.getValue('id')
        const newVotes = updatedLink.getLinkedRecord('_votesMeta')
        const newVoteCount = newVotes.getValue('count')

        const link = proxyStore.get(linkId)
        link.getLinkedRecord('votes').setValue(newVoteCount, 'count')

      },
      error => console.log(`An error occured:`, error),
    )

  }

  render() {
    // debugger
    return (
      <div>
        {this.props.viewer.allLinks.edges.map(({node}, index) =>
          {
            {/*console.log(`render node: `, node)*/}
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

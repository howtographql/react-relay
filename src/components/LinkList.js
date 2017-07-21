import React, { Component } from 'react'
import Link from './Link'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import NewVoteSubscription from '../subscriptions/NewVoteSubscription'

class LinkList extends Component {

  componentDidMount() {
    NewVoteSubscription()
  }

  render() {

    return (
      <div>
        {this.props.viewer.allLinks.edges.map(({node}, index) => (
          <Link key={node.__id} index={index} link={node}/>
        ))}
      </div>
    )
  }

}

export default createFragmentContainer(LinkList, graphql`
  fragment LinkList_viewer on Viewer {
    allLinks(last: 100, orderBy: createdAt_DESC) @connection(key: "LinkList_allLinks", filters: []) {
      edges {
        node {
          ...Link_link
        }
      }
    }
  }
`)

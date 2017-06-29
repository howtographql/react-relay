import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import {GC_USER_ID} from '../constants'
import CreateVoteMutation from '../mutations/CreateVoteMutation'
import '../styles/index.css'
import { timeDifferenceForDate } from '../utils'

class Link extends Component {

  render() {
    // console.log(`Link - render - viewer`, this.props.viewer)
    const userId = localStorage.getItem(GC_USER_ID)
    return (
      <div className='flex mt2 items-start'>
        <div className='flex items-center'>
          <span className='gray'>{this.props.index + 1}.</span>
          {userId && <div className='ml1 gray f11' onClick={() => this._voteForLink()}>▲</div>}
        </div>
        <div className='ml1'>
        <div>{this.props.link.description} ({this.props.link.url})</div>
        <div className='f6 lh-copy gray'>{this.props.link.votes.edges.length} votes | by {this.props.link.postedBy ? this.props.link.postedBy.name : 'Unknown'} {timeDifferenceForDate(this.props.link.createdAt)}</div>
      </div>
    </div>
    )
  }

  _voteForLink = () => {
    const userId = localStorage.getItem(GC_USER_ID)
    // const voterIds = this.props.link.votes.edges.map(node => node.user.id)
    // if (voterIds.includes(userId)) {
    //   console.log(`User (${userId}) already voted for this link.`)
    //   return
    // }

    const linkId = this.props.link.id
    CreateVoteMutation(userId, linkId, this.props.viewer.id)
  }

}

export default createFragmentContainer(Link, graphql`
  fragment Link_viewer on Viewer {
    id
  }
  fragment Link_link on Link {
    id
    description
    url
    createdAt
    postedBy {
      id
      name
    }
    votes @connection(key: "Link_votes", filters: []) {
      edges {
        node {
          id
          user {
            id
          }
        }
      }
    }
  }
`)
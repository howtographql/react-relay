import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../Environment'
import LinkList from './LinkList'
import {ITEMS_PER_PAGE} from '../constants'

const LinkListPageQuery = graphql`
  query LinkListPageQuery(
    $count: Int!,
    $after: String
  ) {
    viewer {
      ...LinkList_viewer
    }
  }
`

class LinkListPage extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        variables={{
          count: ITEMS_PER_PAGE,
        }}
        query={LinkListPageQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <LinkList viewer={props.viewer} />
          }
          return <div>Loading</div>
        }}
      />
    )
  }

}

export default LinkListPage
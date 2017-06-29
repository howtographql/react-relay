import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import LinkList from './LinkList'
import environment from '../Environment'

const LinkListPageQuery = graphql`
  query LinkListPageQuery {
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
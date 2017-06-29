import React, { Component } from 'react'
import {
  QueryRenderer,
  graphql
} from 'react-relay'
import environment from '../Environment'
import CreateLink from './CreateLink'

const CreateLinkPageQuery = graphql`
  query CreateLinkPageQuery {
    viewer {
      ...CreateLink_viewer
    }
  }
`

export default class CreateLinkPage extends Component {

  render() {
    return (
      <QueryRenderer
        environment={environment}
        query={CreateLinkPageQuery}
        render={({error, props}) => {
          if (error) {
            return <div>{error.message}</div>
          } else if (props) {
            return <CreateLink viewer={props.viewer} />
          }
          return <div>Loading</div>
        }}
      />
    )
  }

}
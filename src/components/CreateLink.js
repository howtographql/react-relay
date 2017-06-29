import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import CreateLinkMutation from '../mutations/CreateLinkMutation'
import { withRouter } from 'react-router-dom'

class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {

    return (
      <div>
        <div>
          <input
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <button
          onClick={() => this._createLink()}
        >
          Create Link
        </button>
      </div>
    )

  }

  _createLink = async () => {
    const { description, url } = this.state
    const { id } = this.props.viewer
    CreateLinkMutation(description, url, id, () => this.props.history.push('/'))
  }

}

export default createFragmentContainer(withRouter(CreateLink), graphql`
  fragment CreateLink_viewer on Viewer {
    id
  }
`)

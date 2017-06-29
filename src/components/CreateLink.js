import React, { Component } from 'react'
import {
  createFragmentContainer,
  graphql
} from 'react-relay'
import CreateLinkMutation from '../mutations/CreateLinkMutation'
import { withRouter } from 'react-router-dom'
import { GC_USER_ID } from '../constants'

class CreateLink extends Component {

  state = {
    description: '',
    url: ''
  }

  render() {

    return (
      <div>
        <div className='flex flex-column mt3'>
          <input
            className='mb2'
            value={this.state.description}
            onChange={(e) => this.setState({ description: e.target.value })}
            type='text'
            placeholder='A description for the link'
          />
          <input
            className='mb2'
            value={this.state.url}
            onChange={(e) => this.setState({ url: e.target.value })}
            type='text'
            placeholder='The URL for the link'
          />
        </div>
        <div
          className='button'
          onClick={() => this._createLink()}
        >
          submit
        </div>
      </div>
    )

  }

  _createLink = async () => {
    const postedById = localStorage.getItem(GC_USER_ID)
    if (!postedById) {
      console.error('No user logged in')
      return
    }
    const { description, url } = this.state
    const { id } = this.props.viewer
    CreateLinkMutation(postedById, description, url, id, () => this.props.history.push('/'))
  }

}

export default createFragmentContainer(withRouter(CreateLink), graphql`
  fragment CreateLink_viewer on Viewer {
    id
  }
`)


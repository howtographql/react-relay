import React, { Component } from 'react'
import Link from './Link'
import environment from '../Environment'

class Search extends Component {

  state = {
    links: [],
    searchText: ''
  }

  render() {
    return (
      <div className='mv3'>
        <div className='flex'>
          <input
            type='text'
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <div className='button ml2'
               onClick={() => this._executeSearch()}
          >
            search
          </div>
        </div>
        {this.state.links.map((link, index) => <Link key={link.id} index={index} link={link}/>)}
      </div>
    )
  }

  _executeSearch = async () => {
    const { searchText } = this.state

    const allLinksSearchQueryText = `
      query AllLinksSearchQuery($searchText: String!) {
        viewer {
          allLinks(filter: {
            OR: [
              { url_contains: $searchText }, 
              { description_contains: $searchText }
            ]
          }) {
            edges {
              node {
                id
                url
                description
                createdAt
                postedBy {
                  id
                  name
                }
                votes {
                  count
                }
              }
            }
          }
        }
      }
`
    const allLinksSearchQuery = { text: allLinksSearchQueryText }
    const result = await environment._network.fetch(allLinksSearchQuery, {searchText})

    console.log(result)

  }

}


export default Search
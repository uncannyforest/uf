import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class HeaderLink extends React.Component {
  sectionImage() {
    if (this.props.locations.includes(this.props.location.pathname)
        || (this.props.orNumericLocation && /^\/([0-9])+$/.test(this.props.location.pathname)))
      return `/images/page-${this.props.name}-sel-2x.png`
    else
      return `/images/page-${this.props.name}-2x.png`
  }

  render() {
    if (this.props.externalUrl) {
      return (
        <div className='item'>
          <div className='item'>
            <a href={this.props.externalUrl}>
              <img src={this.sectionImage()} className='map-item' />
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className='item'>
        <div className='item'>
          <Link to={this.props.url}>
            <img src={this.sectionImage()} className='map-item' />
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderLink)

import React from 'react'
import { Link, withRouter } from 'react-router-dom'

class HeaderLink extends React.Component {
  navSelect() {
    if (this.props.locations.includes(this.props.location.pathname)
        || (this.props.orNumericLocation && /^\/([0-9])+$/.test(this.props.location.pathname)))
      return 'selected'
    else
      return ''
  }

  render() {
    if (this.props.externalUrl) {
      return (
        <div className='item'>
          <div className='item'>
            <a href={this.props.externalUrl} className={this.navSelect()}>
              <img src={`/images/page-${this.props.name}-2x.png`} className='map-item' />
            </a>
          </div>
        </div>
      )
    }

    return (
      <div className='item'>
        <div className='item'>
          <Link to={this.props.url} className={this.navSelect()}>
            <img src={`/images/page-${this.props.name}-2x.png`} className='map-item' />
          </Link>
        </div>
      </div>
    )
  }
}

export default withRouter(HeaderLink)

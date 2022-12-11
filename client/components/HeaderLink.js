import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class HeaderLink extends React.Component {
  sectionImage() {
    if (this.props.locations.includes(this.props.location.pathname))
      return `/images/page-${this.props.name}-sel-2x.png`;
    else
      return `/images/page-${this.props.name}-2x.png`;
  }

  render() {
    return (
      <div className='item'>
        <div className='item'>
          <Link to={this.props.url}>
            <img src={this.sectionImage()} className='map_item' />
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(HeaderLink);

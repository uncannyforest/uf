import React from 'react';
import { Link } from 'react-router-dom'

class HeaderLight extends React.Component {
  render() {
    return (
      <div className='typed'>
        <img src='/images/canopy-v2-2x-bare.png' className='hf' />
        <div className='sparse-link'>
          <h2>
            <Link to='/welcome_home'>back to <strong>uncannyforest.com</strong></Link>
          </h2>
        </div>
      </div>
    );
  }
}

export default HeaderLight;

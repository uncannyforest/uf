import React from 'react'
import HeaderLink from './HeaderLink'

class Header extends React.Component {
  render() {
    return (
      <div className='typed'>
        <img src='/images/canopy-v2-2x.png' className='hf' />
        <div className='map'>
          <HeaderLink name='comics' url='/welcome_home' locations={['/', '/welcome_home']} orNumericLocation/>
          <HeaderLink name='archive' url='/archive' locations={['/archive']} />
          <HeaderLink name='blog' externalUrl='https://blog.uncannyforest.com' locations={[]} />
          <HeaderLink name='about' url='/about' locations={['/about']} />
        </div>
      </div>
    )
  }
}

export default Header

import React from 'react'
import HeaderLink from './HeaderLink'
import sitemap from '../sitemap'

class Header extends React.Component {
  render() {
    let selectedSection = null
    let subheader = null
    let selectedSubsection = null

    for (let section in sitemap) {
      if (Array.isArray(sitemap[section])) {
        if (sitemap[section].includes(this.props.location.pathname))
          selectedSection = section
      } else {
        for (let subsection in sitemap[section]) {
          if (sitemap[section][subsection].includes(this.props.location.pathname)
              || (section === 'comics' && subsection === '_'
                  && /^\/([0-9])+$/.test(this.props.location.pathname))) {
            selectedSection = section
            subheader = sitemap[section]
            selectedSubsection = subsection
          }
        }
      }
    }

    return (
      <nav className='header'>
        <img src='/images/canopy-v2-2x.png' className='hf' />
        <ul className='map'>
          <HeaderLink top name='comics' url='/welcome_home'
              selected={selectedSection === 'comics'} />
          <HeaderLink top name='trees' externalUrl='/blog/tag/trees with faces/latest' />
          <HeaderLink top name='localmysteries' externalUrl='/blog/tag/local mysteries/latest' />
          <HeaderLink top name='blog' externalUrl='https://blog.uncannyforest.com' />
          <HeaderLink top name='about' url='/about'
              selected={selectedSection === 'about'} />
        </ul>
        {subheader ? (
          <ul className='subheader'>
              {Object.keys(subheader).filter((s) => s !== '_').map((subsection) =>
                <HeaderLink key={subsection} name={subsection} url={subheader[subsection][0]}
                  selected={subsection === selectedSubsection} />
              )}
          </ul>
        ) : null}
      </nav>
    )
  }
}

export default Header

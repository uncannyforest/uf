import { marked } from 'marked'
import React from 'react'

import about from '../../config/about.yaml'

const About = () => {
  return <div className='textinfo' dangerouslySetInnerHTML={{__html: `
    ${marked.parse(about.uf)}
    <h4>ABOUT ME</h4>
    ${marked.parse(about.me)}
    <h4>OTHERS</h4>
    ${marked.parse(about.friends)}
  `}} />
}

export default About

import axios from 'axios';
import { marked } from 'marked';
import React from 'react'
import { Link } from 'react-router-dom'
import strftime from 'strftime'

import about from '../../config/about.yaml'

class About extends React.Component {
  render() {
    console.log(about);

    return (
      <div className='textinfo' dangerouslySetInnerHTML={{__html: `
        ${marked.parse(about.uf)}
        <h4>ABOUT ME</h4>
        ${marked.parse(about.me)}
        <h4>OTHERS</h4>
        ${marked.parse(about.friends)}
        <h4>FOLLOW</h4>
        ${marked.parse(about.follow)}
      `}} />
    );
  }
}

export default About;

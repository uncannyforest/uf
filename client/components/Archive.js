import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import strftime from 'strftime'

import uncannyforest from '../uncannyforest'

const Archive = () => {
  return (
    <div className='textinfo'>
      <div class="archive-links">
        <Link to='/subscribe'>Email Delivery</Link>
      </div>
      <table className='archive'>
        <tbody>
          {uncannyforest.getComics().map((comic, index) => (
            <tr key={index}>
              <td className='index'>{index}</td>
              <td className='also'>{strftime('%Y %b %-d', new Date(comic.date)).toUpperCase()}</td>
              <td><Link to={`/${index}`}>{comic.title}</Link></td>
            </tr>
          )).reverse()}
        </tbody>
      </table>
    </div>
  );
}

export default Archive;

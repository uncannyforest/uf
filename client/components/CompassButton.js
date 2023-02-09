import React from 'react'
import { Link } from 'react-router-dom'

const CompassButton = ({ empty = false, url, selected, icon }) => {
  if (empty || selected) return <div className="item"></div>

  return (
    <div className="item">
      <Link to={url}>
        <img src={`/images/nav-${icon}-2x.png`} className='comic-nav' />
      </Link>
    </div>
  )
}



export default CompassButton

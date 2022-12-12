import React from 'react';
import { Link } from 'react-router-dom';

const navAsset = (icon, selected) => {
  if (selected) return `/images/nav-${icon}-sel-2x.png`;
  else return `/images/nav-${icon}-2x.png`;
}

const CompassButton = ({ empty = false, url, selected, icon }) => {
  if (empty) return <div className="item"></div>;

  if (selected) return (
    <div className="item">
      <img src={navAsset(icon, selected)} className='comic-nav' />
    </div>
  );

  return (
    <div className="item">
      <Link to={url}>
        <img src={navAsset(icon, selected)} className='comic-nav' />
      </Link>
    </div>
  );
}



export default CompassButton;

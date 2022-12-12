import React from 'react'
import CompassButton from './CompassButton'

const Compass = ({ comicId, numComics }) => {
  const existsPrev = comicId > 0;
  const existsNext = comicId < numComics - 1;
  const linkFirst = "/0"
  const linkPrev = `/${comicId - 1}`
  const linkNext = `/${comicId + 1}`
  const linkLast = `/${numComics - 1}`

  return (
    <div className="compass">
      <CompassButton icon='first' selected={!existsPrev} url={linkFirst} />
      <CompassButton icon='prev' selected={!existsPrev} url={linkPrev} />
      <CompassButton empty />
      <CompassButton empty />
      <CompassButton icon='next' selected={!existsNext} url={linkNext} />
      <CompassButton icon='last' selected={!existsNext} url={linkLast} />
    </div>
  );
}


export default Compass;

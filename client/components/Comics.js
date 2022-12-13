import axios from 'axios';
import React from 'react';
import Compass from './Compass';

import { mobile, desktop } from '../imagePaths';
import uncannyforest from '../uncannyforest';

const Comics = (props) => {
  const totalComics = uncannyforest.getNumComics();
  let id = parseInt(props.match.params.id);
  if (isNaN(id)) id = uncannyforest.getNumComics() - 1;
  const comic = uncannyforest.getComics()[id];

  return <>
    <Compass comicId={id} numComics={totalComics}/>
      <div className='comics'>
        <div className='mobile'>
          {[...Array(comic.panels).keys()].map(panel => (
            <div key={panel} className='panel-div'>
              <img src={mobile(id, panel)} className='panel' />
            </div>
          ))}
        </div>
        <div className='desktop'>
          <img src={desktop(id)} className='desktop' />
        </div>
      </div>
    <Compass comicId={id} numComics={totalComics}/>
  </>;
}

export default Comics;

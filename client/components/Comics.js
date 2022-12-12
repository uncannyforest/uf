import axios from 'axios';
import React from 'react';
import Compass from './Compass'

const genPanelFilename = (comic, panel) => `${comic}-${panel}`;
const genMobilePath = (filename) => `images/comics/${filename}.jpg`;
const genDesktopPath = (comic) => `images/comics/${comic}.png`;

class Comics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: -1,
      comic: {}
    }
  }

  async update() {
    let response;
    let id = parseInt(this.props.match.params.id);
    if (isNaN(id)) {
      response = await axios.get(`/api/comics/latest`);
      id = response.data.totalComics - 1;
    } else {
      response = await axios.get(`/api/comics/${id}`);
    }
    this.setState({
      id: id,
      comic: response.data
    })
  }

  componentDidMount() { this.update() };

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.update();
    }
  };

  render() {
    if (this.state.comic === {}) return;

    return <>
      <Compass comicId={this.state.id} numComics={this.state.comic.totalComics}/>
        <div className='comics'>
          <div className='mobile'>
            {[...Array(this.state.comic.panels).keys()].map(panel => (
              <div key={panel} className='panel-div'>
                <img src={genMobilePath(genPanelFilename(this.state.id, panel))} className='panel' />
              </div>
            ))}
          </div>
          <div className='desktop'>
            <img src={genDesktopPath(this.state.id)} className='desktop' />
          </div>
        </div>
      <Compass comicId={this.state.id} numComics={this.state.comic.totalComics}/>
    </>;
  }

}

export default Comics;

import axios from 'axios';
import React from 'react';
import Compass from './Compass'

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
    console.log('render', this.state);

    if (this.state.comic === {}) return;

    return <>
      <Compass comicId={this.state.id} numComics={this.state.comic.totalComics}/>

      <Compass comicId={this.state.id} numComics={this.state.comic.totalComics}/>
    </>;
  }

}

export default Comics;

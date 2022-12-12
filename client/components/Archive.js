import axios from 'axios';
import React from 'react'
import { Link } from 'react-router-dom'
import strftime from 'strftime'

class Archive extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comics: []
    }
  }

  async componentDidMount() {
    const { data } = await axios.get(`/api/comics`);
    this.setState({
      comics: data
    });
  }

  render() {
    return (
      <div className='textinfo'>
        <table className='archive'>
          <tbody>
            {this.state.comics.map((comic, index) => (
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
}

export default Archive;

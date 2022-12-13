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

  async update(idString) {
    let response;
    let id = parseInt(idString);
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

  componentDidMount() { this.update(this.props.match.params.id) };

  shouldComponentUpdate(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      this.update(nextProps.match.params.id);
      return false;
    }
    return true;
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

var deepDiffMapper = function () {
  return {
    VALUE_CREATED: 'created',
    VALUE_UPDATED: 'updated',
    VALUE_DELETED: 'deleted',
    VALUE_UNCHANGED: 'unchanged',
    map: function(obj1, obj2) {
      if (this.isFunction(obj1) || this.isFunction(obj2)) {
        throw 'Invalid argument. Function given, object expected.';
      }
      if (this.isValue(obj1) || this.isValue(obj2)) {
        if (this.compareValues(obj1, obj2) === this.VALUE_UNCHANGED) return null;
        return {
          type: this.compareValues(obj1, obj2),
          data: obj1 === undefined ? obj2 : obj1
        };
      }

      var diff = {};
      for (var key in obj1) {
        if (this.isFunction(obj1[key])) {
          continue;
        }

        var value2 = undefined;
        if (obj2[key] !== undefined) {
          value2 = obj2[key];
        }

        diff[key] = this.map(obj1[key], value2);
      }
      for (var key in obj2) {
        if (this.isFunction(obj2[key]) || diff[key] !== undefined) {
          continue;
        }

        diff[key] = this.map(undefined, obj2[key]);
      }

      return diff;

    },
    compareValues: function (value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (this.isDate(value1) && this.isDate(value2) && value1.getTime() === value2.getTime()) {
        return this.VALUE_UNCHANGED;
      }
      if (value1 === undefined) {
        return this.VALUE_CREATED;
      }
      if (value2 === undefined) {
        return this.VALUE_DELETED;
      }
      return this.VALUE_UPDATED;
    },
    isFunction: function (x) {
      return Object.prototype.toString.call(x) === '[object Function]';
    },
    isArray: function (x) {
      return Object.prototype.toString.call(x) === '[object Array]';
    },
    isDate: function (x) {
      return Object.prototype.toString.call(x) === '[object Date]';
    },
    isObject: function (x) {
      return Object.prototype.toString.call(x) === '[object Object]';
    },
    isValue: function (x) {
      return !this.isObject(x) && !this.isArray(x);
    }
  }
}();


export default Comics;

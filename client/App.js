import axios from 'axios'
import { marked } from 'marked'
import React from 'react'
import { connect } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header'
import HeaderLight from './components/HeaderLight'
import Footer from './components/Footer'
import Comics from './components/Comics'
import Archive from './components/Archive'
import About from './components/About'
import Commentary from './components/Commentary'
import Profile from './components/Profile'

import about from '../config/about.yaml'
import email from '../resources/email.html'
import { loadLoginState } from './store/auth'
import uncannyforest from './uncannyforest'

class App extends React.Component {
  getComicId() {
    const totalComics = uncannyforest.getNumComics()
    let id = parseInt(this.match.params.id)
    if (isNaN(id)) id = totalComics - 1
    return id
  }

  componentDidMount() {
    this.props.loadLoginState()
  }

  render() {
    return (
      <Router>
        <div className='forest-boundary'>
          <Switch>
            <Route path='/subscribe' component={HeaderLight} />
            <Route path='*' component={Header} />
          </Switch>
          <Switch>
            <Route path='/archive' component={Archive} />
            <Route path='/about' component={About} />
            <Route path='/bio'>
              <div className='textinfo bio'
                dangerouslySetInnerHTML={{__html: marked.parse(about.uf_bio) +
                `<span onclick='new Audio("/cloudpronunciation.m4a").play()'>🔈</span>`}} />
            </Route>
            <Route path='/subscribe-info'>
              <div className='textinfo'
                dangerouslySetInnerHTML={{__html: marked.parse(about.follow)}} />
            </Route>
            <Route path='/subscribe'>
              <div className='sparse'
                dangerouslySetInnerHTML={{__html: marked.parse(about.email) + email}} />
            </Route>
            <Route path='/profile' component={Profile} />
            <Route path='/:id(\d+|welcome_home|)'
              render={(props) => <Comics getComicId={this.getComicId} {...props} />} />
          </Switch>
          <Footer />
        </div>
        <Switch>
        <Route path='/:id(\d+|welcome_home|)'
          render={(props) => <Commentary getComicId={this.getComicId} {...props} />} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => ({
  loadLoginState: () => dispatch(loadLoginState())
})

export default connect(null, mapDispatch)(App)

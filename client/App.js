import axios from 'axios';
import { marked } from 'marked';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HeaderLight from './components/HeaderLight';
import Footer from './components/Footer';
import Comics from './components/Comics';
import Archive from './components/Archive';
import About from './components/About';
import Commentary from './components/Commentary';

import about from '../config/about.yaml'
import email from '../resources/email.html'
import { loadLoginState } from './store/auth'

class App extends React.Component {
  componentDidMount() {
    this.props.loadLoginState();
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
            <Route path='/bio' >
              <div className='textinfo'
                dangerouslySetInnerHTML={{__html: marked.parse(about.uf_bio)}} />
            </Route>
            <Route path='/subscribe' >
              <div className='sparse'
                dangerouslySetInnerHTML={{__html: marked.parse(about.email) + email}} />
            </Route>
            <Route path='/:id(\d+)' component={Comics} />
            <Route exact path={['/welcome_home', '/']} component={Comics} />
          </Switch>
          <Footer />
        </div>
        <Switch>
        <Route path='/:id(\d+)' component={Commentary} />
        <Route exact path={['/welcome_home', '/']} component={Commentary} />
        </Switch>
      </Router>
    )
  }
}

const mapDispatch = (dispatch) => ({
  loadLoginState: () => dispatch(loadLoginState())
});

export default connect(null, mapDispatch)(App);

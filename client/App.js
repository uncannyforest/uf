import { marked } from 'marked';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import HeaderLight from './components/HeaderLight';
import Footer from './components/Footer';
import Comics from './components/Comics';
import Archive from './components/Archive';
import About from './components/About';
import Plains from './components/Plains';

import about from '../config/about.yaml'
import email from '../resources/email.html'

class App extends React.Component {
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
            <Route path='/welcome_home' component={Comics} />
            <Route exact path='/' component={Comics} />
          </Switch>
          <Footer />
        </div>
        <Plains />
      </Router>
    )
  }
}

export default App

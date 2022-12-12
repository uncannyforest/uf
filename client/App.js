import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Comics from './components/Comics';
import Plains from './components/Plains';

class App extends React.Component {
  render() {
    return (
      <Router>
        <div className='forest-boundary'>
          <Header />
          <Switch>
            <Route path='/:id(\d+)' component={Comics} />
            <Route exact path='/welcome_home' component={Comics} />
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

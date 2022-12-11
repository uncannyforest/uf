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
          <Route exact path='/' component={Comics} />
          <Footer />
        </div>
        <Plains />
      </Router>
    )
  }
}

export default App

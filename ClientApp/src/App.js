import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Data from './components/Data'
import MapSetHooks from './components/MapSetHooks'
import NavBar from './components/NavBar'


export default class App extends Component {
  static displayName = App.name;

  render() {
    return (
      <Router>
        <NavBar />
        <Switch>
          <Route path='/' exact component={Data} />
          <Route path='/flightmap' exact component={MapSetHooks} />
        </Switch>
      </Router>

    );
  }
}

import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom'
import Data from './components/Data'
import MapData from './components/MapData'
import Header from './components/Header'
import auth from './auth'
import axios from 'axios'



export default class App extends Component {
  static displayName = App.name;


  componentWillMount() {
    if (auth.isAuthenticated()) {
      axios.defaults.headers.common = {
        Authorization: auth.authorizationHeader()
      }
    }
  }

  render() {
    return (
      <section>

        <Header />
        <Switch>
          <Route path="/login" render={() => auth.login()} />
          <Route
            path="/logout"
            render={() => {
              auth.logout()
              return <p />
            }}
          />
          <Route
            path="/callback"
            render={() => {
              auth.handleAuthentication(() => {
                axios.defaults.headers.common = {
                  Authorization: auth.authorizationHeader()
                }
              })
              return <p />
            }}
          />
          <Route path='/' exact component={Data} />
          <Route path='/flightmap/:flighticao' exact component={MapData} />
        </Switch>

      </section>

    );
  }
}

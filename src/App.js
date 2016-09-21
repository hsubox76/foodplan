import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router'
import store from './store';
import Calendar from './Calendar';
import Dishes from './Dishes';
import SingleDay from './SingleDay';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Calendar}>
          </Route>
          <Route path="day/:id" component={SingleDay} />
          <Route path="dishes" component={Dishes} />
        </Router>
      </Provider>
    );
  }
}

export default App;

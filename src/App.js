import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import store from './store';
import Main from './Main';
import Calendar from './Calendar/Calendar';
import Meal from './Calendar/Meal';
import SingleDay from './Calendar/SingleDay';
import Dishes from './Dishes/Dishes';
import Ingredients from './Ingredients/Ingredients';
import './css/App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Calendar} />
            <Route path="calendar" component={Calendar} />
            <Route path="day/:id" component={SingleDay} />
            <Route path="meal/:id/:date/:type" component={Meal} />
            <Route path="dishes" component={Dishes} />
            <Route path="ingredients" component={Ingredients} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

export default App;

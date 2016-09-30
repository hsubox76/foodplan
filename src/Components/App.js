import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router'
import store from '../store';
import Main from './Main';
import Calendar from './Calendar/Calendar';
import CalendarBox from './Calendar/CalendarBox';
import ShoppingList from './ShoppingList/ShoppingList';
import Meal from './Meal/Meal';
import FavoriteMeals from './FavoriteMeals/FavoriteMeals';
import SingleDay from './Calendar/SingleDay';
import Dishes from './Dishes/Dishes';
import Ingredients from './Ingredients/Ingredients';
import '../css/App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={browserHistory}>
          <Route path="/" component={Main}>
            <IndexRoute component={Calendar} />
            <Route path="calendar" component={Calendar}>
              <IndexRoute component={CalendarBox} />
              <Route path="calendar" component={CalendarBox} />
              <Route path="list" component={ShoppingList} />
            </Route>
            <Route path="day/:id" component={SingleDay} />
            <Route path="favoritemeals" component={FavoriteMeals} />
            <Route path="favoritemeal/:id" component={Meal} />
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

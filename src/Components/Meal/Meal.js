import React, {Component, PropTypes} from 'react';
import { Link, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ItemSelect from '../Shared/ItemSelect';
import MealEditor from './MealEditor';
import {
  addMeal,
  editMeal,
  addFavoriteMeal
} from '../../Actions/actions';
import './Meal.css';

class Meal extends Component {
  constructor(props) {
    super(props);
    this.convertMealToState = this.convertMealToState.bind(this);
    this.formatMealFromState = this.formatMealFromState.bind(this);
    this.createNewDish = this.createNewDish.bind(this);
    this.onChangeDish = this.onChangeDish.bind(this);
    this.onChangeQuantity = this.onChangeQuantity.bind(this);
    this.onChangeMealType = this.onChangeMealType.bind(this);
    this.addDish = this.addDish.bind(this);
    const meal = this.props.meals[this.props.params.id];
    if (meal) {
      this.state = this.convertMealToState(meal);
    } else {
      this.state = {
        dishes: [this.createNewDish()],
        peopleDistribution: _.reduce(this.props.people, (acc, person) => {
          acc[person.id] = 'home';
          return acc;
        }, {}),
        favoriteName: ''
      }
    }
  }
  convertMealToState(meal) {
    return ({
      dishes: _.map(meal.dishDistribution, (dist, key) => ({
        id: key,
        distribution: dist
      })),
      peopleDistribution: _.cloneDeep(meal.peopleDistribution),
      favoriteName: ''
    });
  }
  formatMealFromState() {
    const dishDistribution = _.reduce(this.state.dishes, (acc, dish) => {
      acc[dish.id] = dish.distribution;
      return acc;
    }, {});
    const meal = {
      date: this.props.params.date,
      type: this.props.params.type,
      dishDistribution,
      peopleDistribution: this.state.peopleDistribution
    };
    return meal;
  }
  onChangeMealType(value, personId) {
    this.setState({
      peopleDistribution: _.extend({}, this.state.peopleDistribution, {
        [personId]: value
      })
    });
  }
  onChangeQuantity(index, personId, quantity) {
    this.setState({
      dishes: this.state.dishes.slice(0, index)
        .concat(_.extend({}, this.state.dishes[index], {
          distribution: _.extend({}, this.state.dishes[index].distribution, {
            [personId]: quantity
          })
        }))
        .concat(this.state.dishes.slice(index + 1))
    });
  }
  onChangeDish(index, newDishId) {
    this.setState({
      dishes: this.state.dishes.slice(0, index)
        .concat(_.extend({}, this.state.dishes[index], { id: newDishId }))
        .concat(this.state.dishes.slice(index + 1))
    });
  }
  onChangeFavoriteName(name) {
    this.setState({
      favoriteName: name
    });
  }
  createNewDish() {
    return (
      { distribution: _.reduce(this.props.people, (acc, person) => {
            acc[person.id] = '';
            return acc;
          }, {}), 
      }
    );
  }
  addDish() {
    this.setState({
      dishes: this.state.dishes.concat(this.createNewDish())
    });
  }
  applyMeal(meal) {
    this.setState(this.convertMealToState(meal));
  }
  saveMeal() {
    const meal = this.formatMealFromState();
    if (this.props.params.id !== 'new') {
      meal.id = this.props.params.id;
      this.props.editMeal(meal);
    } else {
      this.props.addMeal(meal);
    }
    browserHistory.goBack();
  }
  favoriteMeal() {
    const meal = this.formatMealFromState();
    if (this.state.favoriteName) {
      meal.name = this.state.favoriteName;
      this.props.addFavoriteMeal(meal);
      this.setState({
        favoriteNameFeedback: 'Added, probably.'
      });
    } else {
      this.setState({
        favoriteNameFeedback: 'Enter a name to add favorite.'
      });
    }
  }
  render() {
    const sortedFavoriteMeals = _(this.props.favoriteMeals).values().sortBy('name').value();
    return (
      <div className="meal-view">
        <div className="back-to-cal-button"><Link to="/calendar"><span className="fa fa-chevron-left" />back to calendar</Link></div>
        <h1>{moment(this.props.params.date, 'YYYY-MM-DD').format('ddd, MMM DD')} : {_.capitalize(this.props.params.type)}</h1>
        <div className="favorite-selector-box">
          <span className="fa fa-star" />
          <ItemSelect
            sortedItems={sortedFavoriteMeals}
            defaultMessage="copy from a favorite meal"
            width={250}
            onItemNameSelect={(meal) => this.applyMeal(meal)}
          />
        </div>
        <MealEditor
          people={this.props.people}
          dishes={this.state.dishes}
          allDishes={this.props.dishes}
          peopleDistribution={this.state.peopleDistribution}
          onChangeMealType={this.onChangeMealType}
          onChangeDish={this.onChangeDish}
          onChangeQuantity={this.onChangeQuantity}
          addDish={this.addDish}
        />
        <div className="save-buttons">
          <div
            className="button save-meal-button"
            onClick={() => this.saveMeal()}
          >
            Save Meal
          </div>
          <div className="favorite-meal-form">
            <input
              type="text"
              value={this.state.favoriteName}
              placeholder="enter name to add favorite"
              onChange={(e) => this.onChangeFavoriteName(e.target.value)}
              />
            <div
              className="button favorite-meal-button"
              onClick={() => this.favoriteMeal()}
            >
              <span className="fa fa-star" />
              Add Meal To Favorites
            </div>
          </div>
          {this.state.favoriteNameFeedback
            && <div className="favorite-meal-form-feedback">{this.state.favoriteNameFeedback}</div>}
        </div>
      </div>
    );
  }
}

Meal.propTypes = {
  params: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    meals: state.meals,
    dishes: state.dishes,
    people: state.people,
    favoriteMeals: state.favoriteMeals
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMeal: (meal) => dispatch(addMeal(meal)),
    editMeal: (meal) => dispatch(editMeal(meal)),
    addFavoriteMeal: (meal) => dispatch(addFavoriteMeal(meal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
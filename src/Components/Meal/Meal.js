import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import ItemSelect from '../Shared/ItemSelect';
import { addMeal, editMeal } from '../../Actions/actions';
import './Meal.css';
import { MEAL_TYPES } from '../../constants/constants';

class Meal extends Component {
  constructor(props) {
    super(props);
    this.createNewDish = this.createNewDish.bind(this);
    const meal = this.props.meals[this.props.params.id];
    if (meal) {
      this.state = {
        dishes: _.map(meal.dishDistribution, (dist, key) => ({
          id: key,
          distribution: dist
        })),
        peopleDistribution: _.cloneDeep(meal.peopleDistribution)
      };
    } else {
      this.state = {
        dishes: [this.createNewDish()],
        peopleDistribution: _.reduce(this.props.people, (acc, person) => {
          acc[person.id] = 'home';
          return acc;
        }, {})
      }
    }
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
  saveMeal() {
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
    if (this.props.params.id !== 'new') {
      meal.id = this.props.params.id;
      this.props.editMeal(meal);
    } else {
      this.props.addMeal(meal);
    }
  }
  render() {
    const sortedDishes = _.sortBy(this.props.dishes, 'name');
    const mealTypeOptions = _.map(MEAL_TYPES, (mealType) => ({
      id: mealType.name,
      name: mealType.name,
      color: mealType.color
    }));
    return (
      <div className="meal-view">
        <h1>Meal View</h1>
        <div>{moment(this.props.params.date, 'YYYY-MM-DD').format('ddd, MMM DD')}</div>
        <div>{this.props.params.type}</div>
        <div className="dish-header-row">
          <div className="dish-header-spacer" />
          {_.map(this.props.people, (person) => <div key={person.id} className="dish-header-name">{person.name}</div>)}
        </div>
        <div className="dish-header-row">
          <div className="dish-header-spacer" />
          {_.map(this.props.people, (person) =>
            <div key={person.id} className="dish-header-name">
              <ItemSelect
                selectedItemId={this.state.peopleDistribution[person.id]}
                sortedItems={mealTypeOptions}
                width={65}
                onItemNameSelect={(item) => this.onChangeMealType(item.id, person.id)}
              />
            </div>)}
        </div>
        {_.map(this.state.dishes, (dish, dishIndex) => 
          <div key={dishIndex} className="dish-row">
            <div className="dish-name">
              <ItemSelect
                selectedItemId={dish.id}
                sortedItems={sortedDishes}
                onItemNameSelect={(item) => this.onChangeDish(dishIndex, item.id)}
              />
            </div>
            {_.map(this.props.people, (person) =>
              <div key={person.id} className="dish-row-qty">
                <input
                  type="number"
                  value={dish.distribution[person.id]}
                  onChange={(e) => this.onChangeQuantity(dishIndex, person.id, e.target.value)}
                />
              </div>)}
          </div>
        )}
        <div className="button add-dish-button" onClick={() => this.addDish()}>Add Dish</div>
        <div className="button save-meal-button" onClick={() => this.saveMeal()}>Save Meal</div>
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
    people: state.people
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addMeal: (meal) => dispatch(addMeal(meal)),
    editMeal: (meal) => dispatch(editMeal(meal))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Meal);
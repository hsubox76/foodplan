import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

class Meal extends Component {
  render() {
    const meal = this.props.meals[this.props.params.id];
    const dishesToPeople = _.reduce(meal.dishDistribution, (acc, dishServingMap, key) => {
      _.forEach(dishServingMap, (servings, dishId) => {
        if (!acc[dishId]) {
          acc[dishId] = [];
        }
        acc[dishId].push(key);
      })
      return acc;
    }, {});
    return (
      <div>
        Meal View
        {_.map(dishesToPeople, (peopleArray, dishId) => 
          <div>
            {this.props.dishes[dishId].name}
            {_.map(peopleArray, (personId) => <span> {this.props.people[personId].name} </span>)}
          </div>
        )}
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

export default connect(mapStateToProps)(Meal);
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import _ from 'lodash';
import './ShoppingList.css';

class ShoppingList extends Component {
  render() {
    const startMoment = moment(this.props.ui.startDate);
    const dates = _.range(startMoment, moment(startMoment).add(this.props.ui.numDays, 'days'), moment.duration(1, 'day'));
    const ingredients = _.reduce(dates, (ingredientsList, date) => {
      const day = this.props.days[moment(date).format('YYYY-MM-DD')] || { mealIds: [] };
      _.forEach(day.mealIds, mealId => {
        const meal = this.props.meals[mealId];
        _.forEach(meal.dishDistribution, (dist, dishId) => {
          const totalServingsNeeded = _.reduce(dist, (total, servings) => {
            if (servings !== '') {
              total += parseFloat(servings);
            }
            return total;
          }, 0);
          const dish = this.props.dishes[dishId];
          const multiplier = totalServingsNeeded / dish.servings;
          _.forEach(dish.ingredientQuantities, ingredient => {
            if (!_.has(ingredientsList, ingredient.id)) {
              ingredientsList[ingredient.id] = {
                name: this.props.ingredients[ingredient.id].name,
                unit: this.props.ingredients[ingredient.id].unit,
                quantity: 0
              };
            }
            ingredientsList[ingredient.id].quantity += ingredient.quantity * multiplier;
          });
        });
      });
      return ingredientsList;
    }, {});
    const ingredientElements = _.map(ingredients, ingredient => {
      return (
        <div className="ingredient-row">
          <div className="ingredient-name">{ingredient.name}</div>
          <div className="ingredient-quantity">{Math.round(ingredient.quantity * 100) / 100}</div>
          <div className="ingredient-unit">{ingredient.unit}</div>
        </div>
      );
    });
    return (
      <div className="shopping-list-page">
        {ingredientElements}
      </div>
    );
  }
}

ShoppingList.propTypes = {
  dishes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
    days: state.days,
    dishes: state.dishes,
    ingredients: state.ingredients,
    meals: state.meals
  }
}

export default connect(mapStateToProps)(ShoppingList);
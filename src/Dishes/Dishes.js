import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../css/Dishes.css';
import DishRow from './DishRow';
import AddDishForm from './AddDishForm';

class Dishes extends Component {
  render() {
    const dishRows = _.map(this.props.dishes, dish => {
      const ingredients = _.map(dish.ingredientIds,
        ingredientId => this.props.ingredients[ingredientId]);
      return <DishRow key={dish.id} dish={dish} ingredients={ingredients} />;
    });
    return (
      <div>
        <h1>Dishes</h1>
        <div className="add-dish-button">add a dish</div>
        <AddDishForm />
        <table className="dishes">
          <tbody>
            {dishRows}
          </tbody>
        </table>
      </div>
    );
  }
}

Dishes.propTypes = {
  dishes: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    dishes: state.dishes,
    ingredients: state.ingredients
  }
}

export default connect(mapStateToProps)(Dishes);
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Dishes.css';
import DishRow from './DishRow';
import AddDishForm from './AddDishForm';
import { addDish, addDishAsOwnIngredient, deleteDish } from '../../Actions/actions';

class Dishes extends Component {
  constructor() {
    super();
    this.state = {
      addFormVisible: false
    }
    this.openDishForm = this.openDishForm.bind(this);
    this.closeDishForm = this.closeDishForm.bind(this);
  }
  openDishForm() {
    this.setState({addFormVisible: true});
  }
  closeDishForm() {
    this.setState({addFormVisible: false});
  }
  render() {
    const dishRows = _.map(this.props.dishes, dish => {
      const ingredients = _.map(dish.ingredientQuantities,
        (ingredientQuantity) => {
          return _.extend({}, this.props.ingredients[ingredientQuantity.id], {quantity: ingredientQuantity.quantity})
        }
      );
      return (
        <DishRow
          key={dish.id}
          dish={dish}
          ingredients={ingredients}
          deleteDish={this.props.deleteDish}
        />
      );
    });
    const addDishButton = (
      <div
        className="button add-dish-button"
        onClick={this.openDishForm}
      >
        add a dish
      </div>
    );
    return (
      <div>
        <h1>Dishes</h1>
        {this.state.addFormVisible
          ? <AddDishForm
              hideForm={this.closeDishForm}
              addDish={this.props.addDish}
              addDishAsOwnIngredient={this.props.addDishAsOwnIngredient}
              ingredients={this.props.ingredients}
            />
          : addDishButton}
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

function mapDispatchToProps(dispatch) {
  return {
    addDish: (dish) => dispatch(addDish(dish)),
    addDishAsOwnIngredient: (dish) => dispatch(addDishAsOwnIngredient(dish)),
    deleteDish: (id) => dispatch(deleteDish(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
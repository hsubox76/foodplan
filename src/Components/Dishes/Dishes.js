import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Dishes.css';
import DishRow from './DishRow';
import DishForm from './DishForm';
import { addDish, addDishAsOwnIngredient, deleteDish } from '../../Actions/actions';

class Dishes extends Component {
  constructor() {
    super();
    this.state = {
      addFormVisible: false,
      dishBeingEditedId: null
    }
    this.openAddDishForm = this.openAddDishForm.bind(this);
    this.closeAddDishForm = this.closeAddDishForm.bind(this);
    this.openEditDishForm = this.openEditDishForm.bind(this);
    this.closeEditDishForm = this.closeEditDishForm.bind(this);
  }
  openAddDishForm() {
    this.setState({
      addFormVisible: true,
      dishBeingEditedId: null
    });
  }
  closeAddDishForm() {
    this.setState({addFormVisible: false});
  }
  openEditDishForm(dishId) {
    this.setState({
      addFormVisible: false,
      dishBeingEditedId: dishId
    })
  }
  closeEditDishForm() {
    this.setState({dishBeingEditedId: null})
  }
  render() {
    const dishRows = _.map(this.props.dishes, dish => {
      if (dish.id === this.state.dishBeingEditedId) {
        return (
          <tr key={dish.id}><td colSpan={3}>
          <DishForm
              hideForm={this.closeEditDishForm}
              addDish={this.props.addDish}
              addDishAsOwnIngredient={this.props.addDishAsOwnIngredient}
              ingredients={this.props.ingredients}
              dish={dish}
            />
          </td></tr>
        );
      }
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
          openEditForm={this.openEditDishForm}
          deleteDish={this.props.deleteDish}
        />
      );
    });
    const addDishButton = (
      <div
        className="button button-cool add-dish-button"
        onClick={this.openAddDishForm}
      >
        add a dish
      </div>
    );
    return (
      <div>
        <h1>Dishes</h1>
        {this.state.addFormVisible
          ? <DishForm
              hideForm={this.closeAddDishForm}
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
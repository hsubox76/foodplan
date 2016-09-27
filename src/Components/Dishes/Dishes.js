import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../../css/Dishes.css';
import DishRow from './DishRow';
import AddDishForm from './AddDishForm';
import { addDish } from '../../Actions/actions';

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
      const ingredients = _.map(dish.ingredientIds,
        ingredientId => this.props.ingredients[ingredientId]);
      return <DishRow key={dish.id} dish={dish} ingredients={ingredients} />;
    });
    const addDishButton = (
      <div
        className="add-dish-button"
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
    addDish: (dish) => dispatch(addDish(dish))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Dishes);
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './Ingredients.css';
import IngredientRow from './IngredientRow';
import AddIngredientForm from './AddIngredientForm';
import {
  addIngredient,
  editIngredient,
  deleteIngredient
} from '../../Actions/actions';

class Ingredients extends Component {
  constructor() {
    super();
    this.state = {
      addFormVisible: false
    }
    this.openIngredientForm = this.openIngredientForm.bind(this);
    this.closeIngredientForm = this.closeIngredientForm.bind(this);
  }
  openIngredientForm() {
    this.setState({addFormVisible: true});
  }
  closeIngredientForm() {
    this.setState({addFormVisible: false});
  }
  render() {
    const ingredientRows = _.map(this.props.ingredients, ingredient => {
      return (
        <IngredientRow
          key={ingredient.id}
          ingredient={ingredient}
          editIngredient={this.props.editIngredient}
          deleteIngredient={this.props.deleteIngredient}
        />
      );
    });
    const addIngredientButton = (
      <div
        className="button button-cool toggle-form-button"
        onClick={this.openIngredientForm}
      >
        add an ingredient
      </div>
    );
    return (
      <div>
        <h1>Ingredients</h1>
        {this.state.addFormVisible
          ? <AddIngredientForm
              addIngredient={this.props.addIngredient}
              lastIngredientId={this.props.lastIngredientId}
              hideForm={this.closeIngredientForm}
            />
          : addIngredientButton}
        <table className="ingredients">
          <tbody>
            {ingredientRows}
          </tbody>
        </table>
      </div>
    );
  }
}

Ingredients.propTypes = {
  ingredients: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ingredients: state.ingredients
  }
}

function mapDispatchToActions(dispatch) {
  return {
    addIngredient: (name, unit, id) => dispatch(addIngredient(name, unit, id)),
    editIngredient: (name, unit, id) => dispatch(editIngredient(name, unit, id)),
    deleteIngredient: (id) => dispatch(deleteIngredient(id))
  }
}

export default connect(mapStateToProps, mapDispatchToActions)(Ingredients);
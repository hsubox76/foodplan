import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import '../css/Ingredients.css';
import IngredientRow from './IngredientRow';
import AddIngredientForm from './AddIngredientForm';
import { addIngredient, editIngredient, deleteIngredient } from '../Actions';

import firebase from 'firebase';

class Ingredients extends Component {
  constructor() {
    super();
    this.state = {
      addFormVisible: false
    }
    this.onAddIngredientButtonClick = this.onAddIngredientButtonClick.bind(this);
    this.onSubmitNewIngredient = this.onSubmitNewIngredient.bind(this);
  }
  onAddIngredientButtonClick() {
    this.setState({addFormVisible: true});
  }
  onSubmitNewIngredient() {
    this.setState({addFormVisible: false});
  }
  populateFirebaseWithCurrentIngredients() {
    firebase.database().ref('users/testuserid/ingredients').set(
      this.props.ingredients);
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
        className="add-ingredient-button"
        onClick={this.onAddIngredientButtonClick}
      >
        add an ingredient
      </div>
    );
    return (
      <div>
        <h1>Ingredients</h1>
        <div onClick={() => this.populateFirebaseWithCurrentIngredients()}>populate</div>
        {this.state.addFormVisible
          ? <AddIngredientForm
              addIngredient={this.props.addIngredient}
              lastIngredientId={this.props.lastIngredientId}
              hideForm={this.onSubmitNewIngredient}
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
    ingredients: state.ingredients,
    lastIngredientId: state.lastId.ingredients
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
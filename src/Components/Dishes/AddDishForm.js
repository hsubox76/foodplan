import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import ItemSelect from '../Shared/ItemSelect';

class AddDishForm extends Component {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onIngredientNameSelect = this.onIngredientNameSelect.bind(this);
    this.state = {
      name: '',
      ingredients: [{ quantity: 0 }],
      ownIngredient: false,
      error: null
    }
  }
  onOwnIngredientClick() {
    this.setState({ ownIngredient: !this.state.ownIngredient })
  }
  onNameChange(e) {
    this.setState({name: e.target.value});
  }
  addIngredientField() {
    this.setState({
      ownIngredient: false,
      ingredients: this.state.ingredients.concat({})
    });
  }
  formatAndAddDish() {
    // more specific and better error checking
    // (also make sure quantities not 0)
    if (this.state.name !== ''
      && this.state.ingredients.length > 0
      && !_.isEmpty(this.state.ingredients[0])) {
        if (this.state.ownIngredient) {
          this.props.addDishAsOwnIngredient(this.state.name);
        } else {
          this.props.addDish({
            name: this.state.name,
            ingredientQuantities: _.map(this.state.ingredients, ingredient => ({
              id: ingredient.id,
              quantity: ingredient.quantity
            }))
          });
        }
      this.props.hideForm();
    } else {
      this.setState({ error: 'error: something missing'});
    }
  }
  onIngredientQuantityChange(quantity, index) {
    const ingredients = this.state.ingredients;
    // need to check for duplicates
    const newIngredients =
      ingredients.slice(0, index)
        .concat(_.extend({}, this.state.ingredients[index], { quantity }))
        .concat(ingredients.slice(index + 1));
    this.setState({
      ingredients: newIngredients
    });
  }
  onIngredientNameSelect(ingredient, index) {
    const ingredients = this.state.ingredients;
    // need to check for duplicates
    const newIngredients =
      ingredients.slice(0, index)
        .concat(ingredient)
        .concat(ingredients.slice(index + 1));
    this.setState({
      ownIngredient: false,
      ingredients: newIngredients
    });
  }
  render() {
    const sortedIngredients = _.sortBy(this.props.ingredients, 'name');
    const ingredientRows = _.map(this.state.ingredients, (ingredient, index) =>
      <div className="add-dish-form-row" key={index}>
        <div className="row-text ingredient-number">
          ingredient {index + 1}
        </div>
        <div className="row-text">
          <ItemSelect
            selectedItemId={ingredient.id}
            onItemNameSelect={(ingredient) =>
              this.onIngredientNameSelect(ingredient, index)}
            sortedItems={sortedIngredients}
          />
        </div>
        <div className="row-text">
          <input
            className="ingredient-quantity"
            placeholder="qty"
            type="number"
            onChange={(e) => this.onIngredientQuantityChange(e.target.value, index)}
          />
        </div>
        <div className="row-text">{ingredient.unit}</div>
      </div>
    );
    return (
      <div className="add-dish-form-container">
        <div className="add-dish-form-row">
          <input
            className="dish-name-field"
            type="text"
            placeholder="name of dish"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <div className="own-ingredient">
            <span
              className={"fa " + (this.state.ownIngredient ? "fa-check-square" : "fa-square")}
              onClick={() => this.onOwnIngredientClick()}
            />
            <span className="own-ingredient-text">
              no ingredients (a new ingredient entry will be created with same name as this dish)
            </span>
          </div>
        </div>
        {ingredientRows}
        <div className="add-dish-form-row">
          <div
            className="button"
            onClick={() => this.addIngredientField()}
          >
            add another ingredient
          </div>
        </div>
        {this.state.error
          && <div className="add-dish-form-row">{this.state.error}</div>}
        <div className="add-dish-form-row">
          <div
            onClick={() => this.formatAndAddDish()}
            className="form-field button new-dish-submit">
              Add It
          </div>
          <div
            onClick={this.props.hideForm}
            className="form-field button new-dish-cancel">
              Cancel
          </div>
        </div>
      </div>
    );
  }
}

AddDishForm.propTypes = {
  addDish: PropTypes.func.isRequired,
  addDishAsOwnIngredient: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
  ingredients: PropTypes.object,
};

export default AddDishForm;
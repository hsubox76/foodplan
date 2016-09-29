import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import ItemSelect from '../Shared/ItemSelect';

class DishForm extends Component {
  constructor(props) {
    super(props);
    this.onIngredientNameSelect = this.onIngredientNameSelect.bind(this);
    if (props.dish) {
      this.state = {
        name: props.dish.name,
        ingredients: _.map(props.dish.ingredientQuantities, iQ =>
          { return _.extend({}, props.ingredients[iQ.id], {
            quantity: iQ.quantity
          });
        }),
        servings: props.dish.servings,
        ownIngredient: false,
        error: null
      }
    } else {
      this.state = {
        name: '',
        ingredients: [{ quantity: 0 }],
        servings: 1,
        ownIngredient: false,
        error: null
      }
    }
  }
  onOwnIngredientClick() {
    this.setState({
      servings: this.state.ownIngredient ? this.state.servings : 1,
      ownIngredient: !this.state.ownIngredient
    });
  }
  onNameChange(name) {
    this.setState({name: name});
  }
  onServingsChange(servings) {
    this.setState({servings: servings});
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
            servings: this.state.servings,
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
          # {index + 1}
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
            value={ingredient.quantity}
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
            onChange={e => this.onNameChange(e.target.value)}
          />
        </div>
        <div className="add-dish-form-row own-ingredient-row">
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
        <div className="add-dish-form-row">
          <div className="row-text">This will make</div>
          <input
            type="number"
            className="num-servings-input"
            value={this.state.servings}
            onChange={e => this.onServingsChange(e.target.value)}
          />
          <div className="row-text">servings</div>
        </div>
        <div className="add-dish-form-row section-title">
          Ingredients:
        </div>
        {ingredientRows}
        <div className="add-dish-form-row">
          <div
            className="button button-cool"
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
            className="form-field button button-cool new-dish-submit">
              Save This Dish
          </div>
          <div
            onClick={this.props.hideForm}
            className="form-field button button-neutral new-dish-cancel">
              Cancel
          </div>
        </div>
      </div>
    );
  }
}

DishForm.propTypes = {
  addDish: PropTypes.func.isRequired,
  addDishAsOwnIngredient: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
  dish: PropTypes.object,
  ingredients: PropTypes.object,
};

export default DishForm;
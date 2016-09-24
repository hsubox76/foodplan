import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import IngredientSelect from './IngredientSelect';

class AddDishForm extends Component {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onIngredientNameSelect = this.onIngredientNameSelect.bind(this);
    this.state = {
      name: '',
      ingredients: [{}]
    }
  }
  onNameChange(e) {
    this.setState({name: e.target.value});
  }
  addIngredientField() {
    this.setState({
      ingredients: this.state.ingredients.concat({})
    });
  }
  onIngredientNameSelect(ingredient, index) {
    const ingredients = this.state.ingredients;
    // need to check for duplicates
    const newIngredients =
      ingredients.slice(0, index)
        .concat(ingredient)
        .concat(ingredients.slice(index + 1));
    this.setState({ingredients: newIngredients});
  }
  render() {
    const sortedIngredients = _.sortBy(this.props.ingredients, 'name');
    const ingredientRows = _.map(this.state.ingredients, (ingredient, index) =>
      <div className="add-dish-form-row" key={index}>
        <div className="row-text ingredient-number">
          ingredient {index + 1}
        </div>
        <div className="row-text">
          <IngredientSelect
            selectedIngredientId={ingredient.id}
            onIngredientNameSelect={(ingredient) =>
              this.onIngredientNameSelect(ingredient, index)}
            sortedIngredients={sortedIngredients}
          />
        </div>
        <div className="row-text">
          <input className="ingredient-quantity" type="number" />
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
        <div
          onClick={this.props.hideForm}
          className="form-field button new-ingredient-submit">
            Cancel
        </div>
      </div>
    );
  }
}

AddDishForm.propTypes = {
  hideForm: PropTypes.func.isRequired,
  ingredients: PropTypes.object,
};

export default AddDishForm;
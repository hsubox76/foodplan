import React, {Component, PropTypes} from 'react';

class AddIngredientForm extends Component {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onUnitChange = this.onUnitChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.state = {
      name: '',
      unit: '',
      error: null
    }
  }
  onAddClick(e) {
    e.preventDefault();
    // need to do some validation or whatever
    if (!this.state.name) {
      this.setState({ error: 'Need an ingredient name.' });
      return;
    }
    if (this.props.isIngredientDuplicate(this.state.name)) {
      this.setState({ error: 'Ingredient with same name already exists.' });
      return;
    }
    this.props.addIngredient(this.state.name, this.state.unit);
    this.props.hideForm();
  }
  onNameChange(e) {
    this.setState({name: e.target.value});
  }
  onUnitChange(e) {
    this.setState({unit: e.target.value});
  }
  render() {
    return (
      <div className="add-ingredient-form-container">
        <form className="add-ingredient-form">
          <input
            className="form-field ingredient-name-field"
            type="text"
            placeholder="name of ingredient"
            value={this.state.name}
            onChange={this.onNameChange}
          />
          <input
            className="form-field ingredient-unit-field"
            type="text"
            placeholder="unit (if any)"
            value={this.state.unit}
            onChange={this.onUnitChange}
          />
          <div
            onClick={this.onAddClick}
            className="form-field button button-cool button-add">
              Add
          </div>
          <div
            onClick={this.props.hideForm}
            className="form-field button button-neutral">
              Cancel
          </div>
        </form>
        <div className="add-ingredient-error">{this.state.error}</div>
      </div>
    );
  }
}

AddIngredientForm.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  hideForm: PropTypes.func.isRequired,
  isIngredientDuplicate: PropTypes.func.isRequired,
};

export default AddIngredientForm;
import React, {Component, PropTypes} from 'react';

class AddIngredientForm extends Component {
  constructor() {
    super();
    this.onNameChange = this.onNameChange.bind(this);
    this.onUnitChange = this.onUnitChange.bind(this);
    this.onAddClick = this.onAddClick.bind(this);
    this.state = {
      name: '',
      unit: ''
    }
  }
  onAddClick(e) {
    e.preventDefault();
    // need to do some validation or whatever
    this.props.addIngredient(this.state.name, this.state.unit, this.props.lastIngredientId + 1);
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
        <form>
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
            className="form-field button new-ingredient-submit">
              Add
          </div>
          <div
            onClick={this.props.hideForm}
            className="form-field button new-ingredient-submit">
              Cancel
          </div>
        </form>
      </div>
    );
  }
}

AddIngredientForm.propTypes = {
  addIngredient: PropTypes.func.isRequired,
  lastIngredientId: PropTypes.number.isRequired,
  hideForm: PropTypes.func.isRequired,
};

export default AddIngredientForm;
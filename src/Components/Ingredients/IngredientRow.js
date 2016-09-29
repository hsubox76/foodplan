import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class IngredientRow extends Component {
  constructor(props) {
    super(props);
    this.renderField = this.renderField.bind(this);
    this.submitEditedIngredient = this.submitEditedIngredient.bind(this);
    this.state = {
      detailsVisible: false,
      isEditMode: false,
      name: props.ingredient.name || '',
      unit: props.ingredient.unit || ''
    }
  }
  setEditMode(isEditMode) {
    this.setState({isEditMode});
  }
  onFieldChange(e, fieldName) {
    this.setState({[fieldName]: e.target.value});
  }
  submitEditedIngredient() {
    // need some validation here
    this.props.editIngredient(this.state.name, this.state.unit,
      this.props.ingredient.id);
    this.setEditMode(false);
  }
  renderField(fieldName) {
    if (this.state.isEditMode) {
      return (
        <input
          className="form-field"
          type="text"
          value={this.state[fieldName]}
          onChange={(e) => this.onFieldChange(e, fieldName)}
        />
      );
    } else {
      return (
        <span className={`ingredient-${fieldName}-text`}>
          {this.props.ingredient[fieldName]}
        </span>
      );
    }
  }
  render() {
    const ingredient = this.props.ingredient;
    const okButton = (
      <td>
        <div
          className="button button-cool edit-button"
          onClick={this.submitEditedIngredient}
        >
          OK
        </div>
      </td>
    );
    const editButton = (
      <td>
        <div
          className="button button-cool edit-button"
          onClick={() => this.setEditMode(true)}
        >
          edit
        </div>
      </td>
    );
    const deleteButton = (
      <td>
        <div
          className="button button-warm delete-button"
          onClick={() => this.props.deleteIngredient(ingredient.id)}
        >
          delete
        </div>
      </td>
    );
    return (
      <tr key={ingredient.id}>
        <td className="ingredient-name">
          <div>
            {this.renderField('name')}
          </div>
        </td>
        <td className="ingredient-unit">
          <div>
            {this.renderField('unit')}
          </div>
        </td>
        {this.state.isEditMode ? okButton : editButton}
        {!this.state.isEditMode && deleteButton}
      </tr>
    );
  }
}

IngredientRow.propTypes = {
  ingredient: PropTypes.object.isRequired,
  editIngredient: PropTypes.func.isRequired,
  deleteIngredient: PropTypes.func.isRequired,
};

export default IngredientRow;
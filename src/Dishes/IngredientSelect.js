import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class IngredientSelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      selectedId: props.selectedIngredientId || null
    }
  }
  showOptions() {
    this.setState({isOpen: true});
  }
  onSelect(ingredient, index) {
    this.props.onIngredientNameSelect(ingredient);
    this.setState({
      isOpen: false,
      selectedId: ingredient.id
    });
  }
  render() {
    const options = _.map(this.props.sortedIngredients, (ingredient, index) =>
      <div
        key={ingredient.id}
        className="option-item"
        onClick={() => this.onSelect(ingredient, index)}
      >
        {ingredient.name}
      </div>
    );
    const optionBox = (
      <div className="option-box">
        {options}
      </div>
    );
    const selectedIngredient = _.find(this.props.sortedIngredients,
              {id: this.state.selectedId});
    const selectedItem = (
      <div className="selected-item" onClick={() => this.showOptions()}>
        <span>{!_.isNil(this.state.selectedId)
          ? selectedIngredient.name
          : 'pick an ingredient'
        }</span>
        <span className="fa fa-caret-down" />
      </div>
    );
    return (
      <div className="ingredient-select">
        {this.state.isOpen ? optionBox : selectedItem}
      </div>
    );
  }
}

IngredientSelect.propTypes = {
  selectedIngredientId: PropTypes.string,
  sortedIngredients: PropTypes.array,
  onIngredientNameSelect: PropTypes.func.isRequired,
};

export default IngredientSelect;
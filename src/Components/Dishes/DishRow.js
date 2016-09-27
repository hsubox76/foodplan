import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class DishRow extends Component {
  constructor() {
    super();
    this.state = {
      detailsVisible: false
    }
  }
  setDetailsVisibility(isVisible) {
    this.setState({detailsVisible: isVisible});
  }
  render() {
    const dish = this.props.dish;
    const visibilityArrow = this.state.detailsVisible
      ? <span
          onClick={() => this.setDetailsVisibility(false)}
          className="fa fa-angle-up dish-details-arrow" />
      : <span
          onClick={() => this.setDetailsVisibility(true)}
          className="fa fa-angle-down dish-details-arrow" />;
    const ingredientsList = (
      <div className="details-container">
        {_.map(this.props.ingredients, ingredient => 
          <div key={ingredient.id} className="ingredient">{ingredient.name}</div>
        )}
      </div>
    );
    return (
      <tr key={dish.id}>
        <td className="dish-name">
          <div>
            <span className="dish-name-text">{dish.name}</span>
            {visibilityArrow}
          </div>
          {this.state.detailsVisible && ingredientsList}
        </td>
        <td>edit</td>
        <td>delete</td>
      </tr>
    );
  }
}

DishRow.propTypes = {
  dish: PropTypes.object,
  ingredients: PropTypes.arrayOf(PropTypes.object)
};

export default DishRow;
import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import { MEAL_TYPES } from '../../constants/constants';
import ItemSelect from '../Shared/ItemSelect';

class MealEditor extends Component {
  render() {
    const sortedDishes = _.sortBy(this.props.allDishes, 'name');
    const mealTypeOptions = _.map(MEAL_TYPES, (mealType) => ({
      id: mealType.name,
      name: mealType.name,
      color: mealType.color
    }));
    return (
      <div className="dish-editing-area">
        <div className="dish-header-row">
          <div className="dish-header-spacer" />
          {_.map(this.props.people, (person) => <div key={person.id} className="dish-header-name">{person.name}</div>)}
        </div>
        <div className="dish-header-row">
          <div className="dish-header-spacer" />
          {_.map(this.props.people, (person) =>
            <div key={person.id} className="dish-header-name">
              <ItemSelect
                selectedItemId={this.props.peopleDistribution[person.id]}
                sortedItems={mealTypeOptions}
                width={65}
                onItemNameSelect={(item) => this.props.onChangeMealType(item.id, person.id)}
              />
            </div>)}
        </div>
        {_.map(this.props.dishes, (dish, dishIndex) => 
          <div key={dishIndex} className="dish-row">
            <div className="dish-name">
              <ItemSelect
                selectedItemId={dish.id}
                sortedItems={sortedDishes}
                onItemNameSelect={(item) => this.props.onChangeDish(dishIndex, item.id)}
              />
            </div>
            {_.map(this.props.people, (person) =>
              <div key={person.id} className="dish-row-qty">
                <input
                  type="number"
                  value={dish.distribution[person.id]}
                  onChange={(e) => this.props.onChangeQuantity(dishIndex, person.id, e.target.value)}
                />
              </div>)}
          </div>
        )}
        <div className="button add-dish-button" onClick={() => this.props.addDish()}>Add Dish</div>
      </div>
    );
  }
}

MealEditor.propTypes = {
  people: PropTypes.object.isRequired,
  allDishes: PropTypes.object.isRequired,
  dishes: PropTypes.array.isRequired,
  peopleDistribution: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  onChangeMealType: PropTypes.func.isRequired,
  onChangeDish: PropTypes.func.isRequired,
  onChangeQuantity: PropTypes.func.isRequired,
  addDish: PropTypes.func.isRequired,
};

export default MealEditor;
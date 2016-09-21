import React, {Component, PropTypes} from 'react';
import _ from 'lodash';

class DayBox extends Component {
  constructor() {
    super();
    this.renderMealRow = this.renderMealRow.bind(this);
  }
  renderMealRow(mealName, day) {
    return(
      <tr className="meal-row">
        {_.map(this.props.people, (person) => {
          const meal = this.props.meals[day.mealIds[mealName]];
          let cellColorClass = '';
          switch(meal.peopleDistribution[person.id]) {
            case 'home':
              cellColorClass = '';
              break;
            case 'packed food':
              cellColorClass = 'cell-packed-meal';
              break;
            case 'outside food':
              cellColorClass = 'cell-outside-meal';
              break;
            default:
              cellColorClass = '';
          }
          return (
            <td className={'meal-person-cell ' + cellColorClass} key={person.id}>
              {_.map(meal.dishDistribution[person.id], (servings, dishId) => 
                <div className="meal-dish" key={dishId}>{this.props.dishes[dishId].name} ({servings})</div>)}
            </td>
          );
        })}
      </tr>
    );
  }
  render() {
    const day = this.props.day;
    return (
      <table key={day.id} className='calendar-day-box'>
        <tbody>
          <tr className="day-title"><td>{day.date.format('ddd, MMM DD')}</td></tr>
          <tr className="people-row">
            {_.map(this.props.people, (person) =>
              <td key={person.id} className='person-name'>{person.name}</td>)}
          </tr>
          {this.renderMealRow('breakfast', day)}
          {this.renderMealRow('lunch', day)}
          {this.renderMealRow('dinner', day)}
        </tbody>
      </table>
    );
  }
}

DayBox.propTypes = {
  day: PropTypes.object,
  people: PropTypes.object,
  meals: PropTypes.object,
  dishes: PropTypes.object
};

export default DayBox;
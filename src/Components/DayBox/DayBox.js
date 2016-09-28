import React, {Component, PropTypes} from 'react';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import { MEAL_TYPES } from '../../constants/constants';
import './DayBox.css';

const MEAL_NAME_WIDTH = 30;

class DayBox extends Component {
  constructor() {
    super();
    this.renderMealRow = this.renderMealRow.bind(this);
    this.onMealHover = this.onMealHover.bind(this);
    this.onMealLeave = this.onMealLeave.bind(this);
    this.state = {
      hoveredMealName: null
    };
  }
  onMealHover(mealName) {
    this.setState({hoveredMealName: mealName});
  }
  onMealLeave() {
    this.setState({hoveredMealName: null});
  }
  renderMealRow(mealName, day) {
    const mealId = day.mealIds[mealName];
    const mealClasses = ['meal-row'];
    if (this.state.hoveredMealName === mealName) {
      mealClasses.push('meal-row-hover');
    }
    const dayString = this.props.day.date;
    if (_.isNil(mealId)) {
      return (
        <tr 
          onMouseEnter={() => this.onMealHover(mealName)}
          onMouseLeave={this.onMealLeave}
          className={mealClasses.join(' ')}>
          <td
            className="meal-name"
          >
            <Link to={`/meal/new/${dayString}/${mealName}`}>
              {mealName[0].toUpperCase()}
            </Link>
          </td>
          <td
            className="create-new-meal-cell"
            colSpan={_.size(this.props.people)}
            style={{width: this.props.width - MEAL_NAME_WIDTH}}
          >
            <Link
              to={`/meal/new/${dayString}/${mealName}`}
            >
              create a new meal
            </Link>
          </td>
        </tr>
      );
    }
    return (
      <tr 
          onMouseEnter={() => this.onMealHover(mealName)}
          onMouseLeave={this.onMealLeave}
          className={mealClasses.join(' ')}>
        <td
          className="meal-name"
        >
          <Link to={`/meal/${mealId}/${dayString}/${mealName}`}>
            {mealName[0].toUpperCase()}
          </Link>
        </td>
        {_.map(this.props.people, (person) => {
          const meal = this.props.meals[mealId];
          const mealType = _.find(MEAL_TYPES, {name: meal.peopleDistribution[person.id]});
          const cellColorStyle = {
            backgroundColor: mealType ? mealType.color : 'transparent',
            opacity: this.state.hoveredMealName === mealName ? 0.75 : 1
          };
          const meals = _(meal.dishDistribution)
            .map((distTable, dishId) => ({ id: dishId, distTable }))
            .filter(dish => _.has(dish.distTable, person.id))
            .map((dish) => {return dish.distTable[person.id]
              ? (
                  <div className="meal-dish" key={dish.id}>
                    {this.props.dishes[dish.id].name} ({dish.distTable[person.id]})
                  </div>
                )
              : (
                  <div className="meal-dish" key={dish.id} />
                )
              }
            )
            .value();
          return (
            <td
              className={'meal-person-cell'}
              style={{width: (this.props.width - 30) / 4 - 5}}
              key={person.id}
            >
              <Link
                to={`/meal/${mealId}/${dayString}/${mealName}`}
                style={cellColorStyle}
              >
                {meals}
              </Link>
            </td>
          );
        })}
      </tr>
    );
  }
  render() {
    const day = this.props.day;
    const zoomLink = (
      <Link to={`/day/${day.date}`}>
        <span className="fa fa-search-plus zoom-icon" aria-hidden="true"></span>
      </Link>
    );
    const backLink = (
      <Link to={`/calendar`}>
        <span className="fa fa-angle-double-left back-icon" aria-hidden="true"></span>
      </Link>
    );
    return (
      <div className='day-box'>
        <table key={day.date} className='day-box-table'>
          <tbody>
            <tr className="day-title">
              <td colSpan="5">
                <div>
                  { this.props.type === 'single' && backLink}
                  <span className="day-title-date">
                    {moment(day.date, 'YYYY-MM-DD').format('ddd, MMM DD')}
                  </span>
                  { this.props.type === 'calendar' && zoomLink}
                </div>
              </td>
            </tr>
            <tr className="people-row">
              <td className="person-row-spacer"></td>
              {_.map(this.props.people, (person) =>
                <td key={person.id} className='person-name'>
                  <div>{person.name}</div>
                </td>
              )}
            </tr>
            {this.renderMealRow('breakfast', day)}
            {this.renderMealRow('lunch', day)}
            {this.renderMealRow('dinner', day)}
          </tbody>
        </table>
      </div>
    );
  }
}

DayBox.propTypes = {
  day: PropTypes.object,
  people: PropTypes.object,
  meals: PropTypes.object,
  dishes: PropTypes.object,
  width: PropTypes.number,
};

export default DayBox;
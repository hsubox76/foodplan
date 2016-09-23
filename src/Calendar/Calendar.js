import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DayBox from './DayBox';

class Calendar extends Component {
  render() {
    // probably need to limit this as number of days gets bigger
    const dayBoxes = this.props.days.map((day) => {
      return (
        <DayBox
          key={day.id}
          type="calendar"
          day={day}
          people={this.props.people}
          meals={this.props.meals}
          dishes={this.props.dishes}
          width={400}
        />
      );
    });
    return (
      <div className="calendar-container">
        {dayBoxes}
      </div>
    );
  }
}

Calendar.propTypes = {
  days: PropTypes.array,
  meals: PropTypes.object,
  dishes: PropTypes.object,
  people: PropTypes.object,

};

function mapStateToProps(state) {
  return {
    days: state.days,
    meals: state.meals,
    dishes: state.dishes,
    people: state.people
  };
}

export default connect(mapStateToProps)(Calendar);
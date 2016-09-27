import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import DayBox from './DayBox';

class Calendar extends Component {
  render() {
    const startMoment = moment(this.props.range.start);
    const endMoment = moment(this.props.range.end);
    const dayBoxes = [];
    let currentMillis = startMoment.valueOf();
    while (currentMillis <= endMoment) {
      const day = this.props.days[moment(currentMillis).format('YYYY-MM-DD')]
        || {
          id: 'new_' + currentMillis,
          date: moment(currentMillis).format('YYYY-MM-DD'),
          mealIds: {}
        }
      dayBoxes.push(
        <DayBox
          key={day.date}
          type="calendar"
          day={day}
          people={this.props.people}
          meals={this.props.meals}
          dishes={this.props.dishes}
          width={400}
        />
      );
      currentMillis += moment.duration(1, 'day');
    }
    // const dayBoxes = this.props.days.map((day) => {
    //   return (
    //     <DayBox
    //       key={day.id}
    //       type="calendar"
    //       day={day}
    //       people={this.props.people}
    //       meals={this.props.meals}
    //       dishes={this.props.dishes}
    //       width={400}
    //     />
    //   );
    // });
    return (
      <div className="calendar-container">
        {dayBoxes}
      </div>
    );
  }
}

Calendar.propTypes = {
  range: PropTypes.object,
  days: PropTypes.object,
  meals: PropTypes.object,
  dishes: PropTypes.object,
  people: PropTypes.object,

};

Calendar.defaultProps = {
  range: {
    start: '2016-09-01',
    end: '2016-09-05'
  }
}

function mapStateToProps(state) {
  return {
    days: state.days,
    meals: state.meals,
    dishes: state.dishes,
    people: state.people
  };
}

export default connect(mapStateToProps)(Calendar);
import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import DayBox from '../DayBox/DayBox';

class CalendarBox extends Component {
  render() {
    if (!this.props.ui.startDate) {
      return (<div>setting default dates</div>);
    }
    const startMoment = moment(this.props.ui.startDate);
    const dates = _.range(startMoment, moment(startMoment).add(this.props.ui.numDays, 'days'), moment.duration(1, 'day'));
    const dayBoxes = _.map(dates, date => {
      const day = this.props.days[moment(date).format('YYYY-MM-DD')]
        || {
          id: 'new_' + date,
          date: moment(date).format('YYYY-MM-DD'),
          mealIds: {}
        }
      return (
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
    });
    return (
      <div className="calendar-container">
        {dayBoxes}
      </div>
    );
  }
}

CalendarBox.propTypes = {
  ui: PropTypes.object,
  people: PropTypes.object,
  meals: PropTypes.object,
  dishes: PropTypes.object,
  days: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    ui: state.ui,
    days: state.days,
    meals: state.meals,
    dishes: state.dishes,
    people: state.people
  };
}

export default connect(mapStateToProps)(CalendarBox);
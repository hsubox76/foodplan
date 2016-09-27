import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import DayBox from '../DayBox/DayBox';
import DateForm from './DateForm';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment().format('YYYY-MM-DD'),
      numDays: 5
    }
  }
  onRangeChange(newDate, numDays) {
    this.setState({
      startDate: moment(newDate).format('YYYY-MM-DD'),
      numDays
    });
  }
  render() {
    const startMoment = moment(this.state.startDate);
    const dates = _.range(startMoment, moment(startMoment).add(this.state.numDays, 'days'), moment.duration(1, 'day'));
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
      <div>
        <h1>Calendar</h1>
        <DateForm
          startMoment={moment(this.state.startDate, 'YYYY-MM-DD')}
          numDays={this.state.numDays}
          onRangeChange={(date, numDays) => this.onRangeChange(date, numDays)}
        />
        <div className="calendar-container">
          {dayBoxes}
        </div>
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
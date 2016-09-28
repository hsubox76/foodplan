import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import moment from 'moment';
import DayBox from '../DayBox/DayBox';
import DateForm from './DateForm';
import { setDateRange } from '../../Actions/actions';

class Calendar extends Component {
  componentWillMount() {
    // set default range
    if (!this.props.ui.startDate) {
      this.props.setDateRange(moment().startOf('day').format('YYYY-MM-DD'), 5);
    }
  }
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
      <div>
        <h1>Calendar</h1>
        <DateForm
          startMoment={moment(this.props.ui.startDate, 'YYYY-MM-DD')}
          numDays={this.props.ui.numDays}
          onRangeChange={this.props.setDateRange}
        />
        <div className="calendar-container">
          {dayBoxes}
        </div>
      </div>
    );
  }
}

Calendar.propTypes = {
  days: PropTypes.object,
  meals: PropTypes.object,
  dishes: PropTypes.object,
  people: PropTypes.object,

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

function mapDispatchToProps(dispatch) {
  return {
    setDateRange: (startDate, numDays) => dispatch(setDateRange(startDate, numDays))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
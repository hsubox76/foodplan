import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import _ from 'lodash';
import moment from 'moment';
import DateForm from './DateForm';
import { setDateRange } from '../../Actions/actions';
import './Calendar.css';

class Calendar extends Component {
  componentWillMount() {
    // set default range
    if (!this.props.ui.startDate) {
      this.props.setDateRange(moment().startOf('day').format('YYYY-MM-DD'), 5);
    }
  }
  render() {
    return (
      <div className="calendar-page">
        <h1>Calendar</h1>
        {this.props.ui.startDate &&
          <DateForm
            startMoment={moment(this.props.ui.startDate, 'YYYY-MM-DD')}
            numDays={this.props.ui.numDays}
            onRangeChange={this.props.setDateRange}
          />
        }
        <div className="calendar-page-tabs">
          <Link className="tab" activeClassName="tab-selected" to="/calendar/calendar">Calendar</Link>
          <Link className="tab" activeClassName="tab-selected" to="/calendar/list">List</Link>
        </div>
        <div className="calendar-child-content">
          {this.props.children}
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
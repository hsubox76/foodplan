import React, {Component, PropTypes} from 'react';
import moment from 'moment';
import _ from 'lodash';
import ItemSelect from '../Shared/ItemSelect';
import './DateForm.css';

const months = _.map(_.range(12), monthNum => ({
  id: monthNum.toString(),
  name: moment().month(monthNum).format('MMM')
}));

class DateForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      month: this.props.startMoment.month().toString(),
      day: this.props.startMoment.date(),
      year: this.props.startMoment.year(),
      numDays: this.props.numDays
    }
  }
  changeYear(year) {
    this.setState({
      year: year
    })
  }
  changeMonth(monthId) {
    this.setState({
      month: monthId
    })
  }
  changeDay(day) {
    this.setState({
      day: day
    })
  }
  changeNumDays(numDays) {
    this.setState({
      numDays: numDays
    })
  }
  onOkClick() {
    this.props.onRangeChange(
      moment()
        .month(this.state.month)
        .date(this.state.day)
        .year(this.state.year)
        .format('YYYY-MM-DD'),
      this.state.numDays
    );
  }
  render() {
    const years = _.map(_.range(this.state.year, this.state.year + 3), yearNum => ({
      id: yearNum.toString(),
      name: yearNum
    }));
    return (
      <div className="date-form">
        <ItemSelect
          width={80}
          height={25}
          selectedItemId={this.state.month}
          sortedItems={months}
          onItemNameSelect={(item) => this.changeMonth(item.id)}
        />
        <input type="number"
          className="day-input"
          value={this.state.day}
          onChange={(e) => this.changeDay(e.target.value)}
        />
        <ItemSelect
          width={80}
          height={25}
          selectedItemId={this.state.year.toString()}
          sortedItems={years}
          onItemNameSelect={(item) => this.changeYear(item.id)}
        />
        <div className="form-block">
          <div className="form-text">+</div>
          <input type="number"
            className="num-days-input"
            value={this.state.numDays}
            onChange={(e) => this.changeNumDays(e.target.value)}
          />
          <div className="form-text">days</div>
        </div>
        <div
          className="button button-cool date-ok-button"
          onClick={() => this.onOkClick()}
        >
          OK
        </div>
      </div>
    );
  }
}

DateForm.propTypes = {
  startMoment: PropTypes.object,
  numDays: PropTypes.number,
  onRangeChange: PropTypes.func,
};

export default DateForm;
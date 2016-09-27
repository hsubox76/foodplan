import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import DayBox from '../DayBox/DayBox';

class SingleDay extends Component {
  render() {
    const day = this.props.days[this.props.params.id]
      || {
        date: this.props.params.id,
        mealIds: {}
      }
    return (
      <div className='calendar-container'>
        <DayBox
          type="single"
          day={day}
          people={this.props.people}
          meals={this.props.meals}
          dishes={this.props.dishes}
          width={window.innerWidth * 0.85}
        />
      </div>
    );
  }
}

SingleDay.propTypes = {
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

export default connect(mapStateToProps)(SingleDay);
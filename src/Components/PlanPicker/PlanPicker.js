import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import './PlanPicker.css';
import { setSelectedPlanId } from '../../Actions/actions';

class PlanPicker extends Component {
  constructor() {
    super();
    this.state = {
      customCode: ''
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.planIds && nextProps.planIds.length === 1) {
      this.props.setSelectedPlanId(nextProps.planIds[0]);
    }
  }
  onCustomCodeChange(e) {
    this.setState({customCode: e.target.value});
  }
  render() {
    if (this.props.planIds) {
      return (
        <div className="plan-picker-container">
          <h3>pick a plan</h3>
          {this.props.planIds.length === 0 &&
            <div
              className="row plan-button"
              onClick={() => this.props.setSelectedPlanId(this.props.user.uid) }>
              start a new plan
            </div>
          }
          {_.map(this.props.planIds, planId =>
            <div
              key={planId}
              className="row plan-button"
              onClick={() => this.props.setSelectedPlanId(planId)}
            >
              {planId}
            </div>)
          }
          <div className="row">or type in a code for an existing plan</div>
          <div className="row">
            <input
              type="text"
              placeholder="type code here"
              value={this.state.customCode}
              onChange={(e) => this.onCustomCodeChange(e)}
            />
          </div>
          <div className="row">
            <div
              className="use-code-button"
              onClick={() => this.props.setSelectedPlanId(this.state.customCode)}
            >
              use that code
            </div>
          </div>
        </div>
      );
    } else {
      return <div className="plan-picker-container">loading just a sec</div>;
    }
  }
}

PlanPicker.propTypes = {
  planIds: PropTypes.array,
};

function mapStateToProps(state) {
  return {
    user: state.userData.user,
    planIds: state.userData.planIds
  };
}

function mapDispatchToProps(dispatch) {
  return {
    setSelectedPlanId: (planId) => dispatch(setSelectedPlanId(planId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PlanPicker);
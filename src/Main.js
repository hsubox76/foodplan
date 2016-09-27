import React, {Component, PropTypes} from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import PlanPicker from './PlanPicker/PlanPicker';
import { checkAuth, getPlanDataFromFirebase } from './Actions/actions';

class Main extends Component {
  componentDidMount() {
    this.props.checkAuth();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userData.selectedPlanId && !this.props.userData.selectedPlanId) {
      this.props.getPlanDataFromFirebase();
    }
  }
  signOut(e) {
    e.preventDefault();
    firebase.auth().signOut();
    // need to add error handling
  }
  render() {
    if (this.props.userData.selectedPlanId && this.props.planDataLoaded) {
      return (
        <div className="main-container">
          <div className="menu-bar">
            <div><Link to='/calendar'>calendar</Link></div>
            <div><Link to='/dishes'>dishes</Link></div>
            <div><Link to='/ingredients'>ingredients</Link></div>
            <div><a onClick={(e) => this.signOut(e)}>sign out</a></div>
          </div>
          <div className="content-container">
            {this.props.children}
          </div>
        </div>
      );
    } else {
      if (this.props.userData.selectedPlanId && !this.props.planDataLoaded) {
        return <div className="main-container">loading plan data</div>
      }
      return <div className="main-container"><PlanPicker /></div>;
    }
  }
}

Main.propTypes = {
  userData: PropTypes.object.isRequired,
  checkAuth: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    userData: state.userData,
    planDataLoaded: state.ui.planDataLoaded
  };
}

function mapDispatchToActions(dispatch) {
  return {
    checkAuth: () => dispatch(checkAuth()),
    getPlanDataFromFirebase: () => dispatch(getPlanDataFromFirebase())
  };
}

export default connect(mapStateToProps, mapDispatchToActions)(Main);
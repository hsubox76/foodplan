import React, {Component, PropTypes} from 'react';
import firebase from 'firebase';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setUser } from './Actions';

const provider = new firebase.auth.GoogleAuthProvider();

class Main extends Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        this.props.setUser(user);
      } else {
        // No user is signed in.
        firebase.auth().signInWithRedirect(provider);
      }
    });
  }
  signOut(e) {
    e.preventDefault();
    firebase.auth().signOut();
    // need to add error handling
  }
  render() {
    if (this.props.user && this.props.user.email) {
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
      return <div>not logged in</div>;
    }
  }
}

Main.propTypes = {
  user: PropTypes.object.isRequired,
  setUser: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.user
  };
}

function mapDispatchToActions(dispatch) {
  return {
    setUser: (user) => dispatch(setUser(user))
  };
}

export default connect(mapStateToProps, mapDispatchToActions)(Main);
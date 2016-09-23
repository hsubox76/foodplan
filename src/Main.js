import React, {Component} from 'react';
import { Link } from 'react-router';

class Main extends Component {
  render() {
    return (
      <div className="main-container">
        <div className="menu-bar">
          <div><Link to='/calendar'>calendar</Link></div>
          <div><Link to='/dishes'>dishes</Link></div>
          <div><Link to='/ingredients'>ingredients</Link></div>
        </div>
        <div className="content-container">
          {this.props.children}
        </div>
      </div>
    );
  }
}

Main.propTypes = {

};

export default Main;
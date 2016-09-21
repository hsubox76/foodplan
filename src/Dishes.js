import React, {Component, PropTypes} from 'react';

class Dishes extends Component {
  render() {
    return (
      <div>
        Dishes
      </div>
    );
  }
}

Dishes.propTypes = {
  dishes: PropTypes.array,
};

export default Dishes;
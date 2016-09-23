import React, {Component, PropTypes} from 'react';

class AddDishForm extends Component {
  render() {
    return (
      <div className="add-dish-form-container">
        <form>
          <input
            className="dish-name-field"
            type="text"
            placeholder="name of dish"
          />
        </form>
      </div>
    );
  }
}

AddDishForm.propTypes = {

};

export default AddDishForm;
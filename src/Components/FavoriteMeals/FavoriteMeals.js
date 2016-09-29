import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import _ from 'lodash';
import './FavoriteMeals.css';

class FavoriteMeals extends Component {
  onEditClick(id) {
    browserHistory.push(`/favoritemeal/${id}`);
  }
  render() {
    const meals = _.map(this.props.favoriteMeals, (meal) => {
          return (
            <div key={meal.id} className="meal-box">
              <div className="meal-info">
                <div className="meal-name">{meal.name}</div>
                <div className="meal-type">{meal.type}</div>
              </div>
              <div className="buttons">
                <div
                  className="button button-edit button-cool"
                  onClick={() => this.onEditClick(meal.id)}
                >
                  edit
                </div>
                <div className="button button-warm">
                  delete
                </div>
              </div>
            </div>
          );
        })
    return (
      <div className="favorite-meals">
        <h1>Favorite Meals</h1>
        {meals}
      </div>
    );
  }
}

FavoriteMeals.propTypes = {
  favoriteMeals: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    favoriteMeals: state.favoriteMeals
  }
}

export default connect(mapStateToProps)(FavoriteMeals);
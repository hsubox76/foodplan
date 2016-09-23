import _ from 'lodash';
import { ACTIONS } from './Actions';

function days(state = [], action) {
  return state;
};
function lastId(state = [], action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.ADD_INGREDIENT:
      return _.extend({}, state, { ingredients: payload.id });
    default:
      return state;
  }
};
function ingredients(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.ADD_INGREDIENT:
    case ACTIONS.EDIT_INGREDIENT:
      return _.extend({}, state, { [payload.id]: {
          id: payload.id,
          name: payload.name,
          unit: payload.unit
        }
      });
    case ACTIONS.DELETE_INGREDIENT:
      return _.omit(state, payload.id);
    default:
      return state;
  }
};
function dishes(state = [], action) {
  return state;
};
function meals(state = [], action) {
  return state;
};
function people(state = [], action) {
  return state;
};
function reducer (state = {}, action) {
  return {
    days: days(state.days, action),
    lastId: lastId(state.lastId, action),
    ingredients: ingredients(state.ingredients, action),
    dishes: dishes(state.dishes, action),
    meals: meals(state.meals, action),
    people: people(state.people, action)
  }
}

export default reducer;
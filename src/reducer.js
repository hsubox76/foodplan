import _ from 'lodash';
import { ACTIONS } from './Actions/actions';

function ui(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_DATA:
      return _.extend({}, state, {planDataLoaded: true});
    case ACTIONS.SET_DATE_RANGE:
      return _.extend({}, state, {
        startDate: payload.startDate,
        numDays: payload.numDays
      });
    default:
      return state;
  }
}
function userData(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_IDS:
      return _.extend({}, state, {
        planIds: payload.planIds
      });
    case ACTIONS.SET_SELECTED_PLAN_ID:
      return _.extend({}, state, {
        selectedPlanId: payload.planId
      });
    case ACTIONS.SET_USER:
      return _.extend({}, state, {
        user: payload.user
      });
    default:
      return state;
  }
}
function days(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_DATA:
      if (payload.days) {
        return _.keyBy(payload.days, 'date');
      }
      return state;
    default:
      return state;
  }
};
function ingredients(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_DATA:
      if (payload.ingredients) {
        return _.keyBy(payload.ingredients, 'id');
      }
      return state;
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
function dishes(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_DATA:
      if (payload.dishes) {
        return _.keyBy(payload.dishes, 'id');
      }
      return state;
    default:
      return state;
  }
};
function favoriteMeals(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_DATA:
      if (payload.favoritemeals) {
        return _.keyBy(payload.favoritemeals, 'id');
      }
      return state;
    default:
      return state;
  }
};
function meals(state = {}, action) {
  const payload = action.payload;
  switch(action.type) {
    case ACTIONS.SET_PLAN_DATA:
      if (payload.meals) {
        return _.keyBy(payload.meals, 'id');
      }
      return state;
    default:
      return state;
  }
};
function people(state = {}, action) {
  return state;
};
function reducer (state = {}, action) {
  return {
    userData: userData(state.userData, action),
    days: days(state.days, action),
    ingredients: ingredients(state.ingredients, action),
    dishes: dishes(state.dishes, action),
    meals: meals(state.meals, action),
    favoriteMeals: favoriteMeals(state.favoriteMeals, action),
    people: people(state.people, action),
    ui: ui(state.ui, action)
  }
}

export default reducer;
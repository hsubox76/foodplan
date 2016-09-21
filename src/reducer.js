function days(state = [], action) {
  return state;
};
function lastId(state = [], action) {
  return state;
};
function ingredients(state = [], action) {
  return state;
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
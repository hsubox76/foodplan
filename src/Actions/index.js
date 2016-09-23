export const ACTIONS = {
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT',
  EDIT_INGREDIENT: 'EDIT_INGREDIENT'
};

export function addIngredient(name, unit, id) {
  return { type: ACTIONS.ADD_INGREDIENT, payload: { name, unit, id } };
}

export function editIngredient(name, unit, id) {
  return { type: ACTIONS.EDIT_INGREDIENT, payload: { name, unit, id } };
}

export function deleteIngredient(id) {
  return { type: ACTIONS.DELETE_INGREDIENT, payload: { id } };
}

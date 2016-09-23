import firebase from 'firebase';

export const ACTIONS = {
  SET_USER: 'SET_USER',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT',
  EDIT_INGREDIENT: 'EDIT_INGREDIENT'
};

export function setUser(user) {
  return { type: ACTIONS.SET_USER, payload: { user } };
}

export function addIngredient(name, unit, id) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    firebase.database().ref('users/' + user.uid + '/ingredients/' + id).set({
      name: name,
      unit: unit,
      id: id
    });
    dispatch({ type: ACTIONS.ADD_INGREDIENT, payload: { name, unit, id } });
  }
}

export function editIngredient(name, unit, id) {
  return (dispatch, getStore) => {
    const { user } = getStore();
    firebase.database().ref('users/' + user.uid + '/ingredients/' + id).set({
      name: name,
      unit: unit,
      id: id
    });
    dispatch({ type: ACTIONS.EDIT_INGREDIENT, payload: { name, unit, id } });
  }
}

export function deleteIngredient(id) {
  return { type: ACTIONS.DELETE_INGREDIENT, payload: { id } };
}

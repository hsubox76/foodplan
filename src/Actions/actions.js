import firebase from 'firebase';
import _ from 'lodash';

const provider = new firebase.auth.GoogleAuthProvider();

const DB_PATH = 'plans/';
const USERINFO_PATH = 'users/';

export const ACTIONS = {
  SET_USER: 'SET_USER',
  SET_PLAN_IDS: 'SET_PLAN_IDS',
  SET_SELECTED_PLAN_ID: 'SET_SELECTED_PLAN_ID',
  ADD_INGREDIENT: 'ADD_INGREDIENT',
  DELETE_INGREDIENT: 'DELETE_INGREDIENT',
  EDIT_INGREDIENT: 'EDIT_INGREDIENT',
  SET_PLAN_DATA: 'SET_PLAN_DATA'
};

export function writeToFirebasePlanWith(destination, data) {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    firebase.database().ref(`${DB_PATH}${userData.selectedPlanId}/${destination}`).set(data);
  }
}

export function getPlanDataFromFirebase() {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    firebase.database().ref(`${DB_PATH}${userData.selectedPlanId}`)
      .on('value', snapshot => {
        const planData = snapshot.val();
        if (planData) {
          dispatch({type: ACTIONS.SET_PLAN_DATA, payload: planData})
        }
      });
  }
}

export function checkAuth() {
  return (dispatch) => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in.
        dispatch(setUser(user));
        dispatch(getPlanIds(user.uid));
      } else {
        // No user is signed in.
        firebase.auth().signInWithRedirect(provider);
      }
    });
  }
}

export function getPlanIds(userId) {
  return (dispatch) => {
    firebase.database().ref(USERINFO_PATH + userId + '/planIds')
      .once('value')
      .then(snapshot => {
        const planIds = snapshot.val() || [];
        dispatch({ type: ACTIONS.SET_PLAN_IDS, payload: { planIds }});
      });
  }
}

export function setUser(user) {
  return ({ type: ACTIONS.SET_USER, payload: { user } });
}

export function setSelectedPlanId(planId) {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    if (!_.includes(userData.planIds, planId)) {
      // user creating a new plan
      const newPlanIds = userData.planIds.concat(planId);
      firebase.database().ref(USERINFO_PATH + userData.user.uid).set({
        planIds: newPlanIds
      });
      dispatch({ type: ACTIONS.SET_PLAN_IDS, payload: { planIds: newPlanIds }});
    }
    dispatch({ type: ACTIONS.SET_SELECTED_PLAN_ID, payload: { planId } });
  }
}

// change signature to take ingredient object as arg
export function addIngredient(name, unit) {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    const newIngredientRef =
      firebase.database().ref(DB_PATH + userData.selectedPlanId + '/ingredients').push();
    newIngredientRef.set({
      name: name,
      unit: unit,
      id: newIngredientRef.key
    });
    dispatch({ type: ACTIONS.ADD_INGREDIENT, payload: { name, unit, id: newIngredientRef.key } });
  }
}

// change signature to take ingredient object as arg
export function editIngredient(name, unit, id) {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    firebase.database().ref(DB_PATH + userData.selectedPlanId + '/ingredients/' + id).set({
      name: name,
      unit: unit,
      id: id
    });
    dispatch({ type: ACTIONS.EDIT_INGREDIENT, payload: { name, unit, id } });
  }
}

export function deleteIngredient(id) {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    firebase.database().ref(DB_PATH + userData.selectedPlanId + '/ingredients/' + id).remove();
    dispatch({ type: ACTIONS.DELETE_INGREDIENT, payload: { id } });
  }
}

export function addDish(dish) {
  return (dispatch, getStore) => {
    const { userData } = getStore();
    const newDishRef =
      firebase.database().ref(DB_PATH + userData.selectedPlanId + '/dishes').push();
    newDishRef.set({
      id: newDishRef.key,
      name: dish.name,
      ingredientIds: dish.ingredientIds
    });
  }
}
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const initialState = {
  userData: {},
  people: {
    0: {
      id: '0',
      name: 'Dad'
    },
    1: {
      id: '1',
      name: 'Mom'
    },
    2: {
      id: '2',
      name: 'Jesse'
    },
    3: {
      id: '3',
      name: 'Sid'
    },
  },
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;

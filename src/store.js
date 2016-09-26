import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';
import moment from 'moment';

const initialState = {
  userData: {},
  lastId: {
    days: 1,
    meals: 2,
    people: 3,
    dishes: 3,
    ingredients: 4
  },
  days: [
    {
      id: '0',
      date: moment('2016-09-01', 'YYYY-MM-DD'),
      mealIds: {
        breakfast: 0,
        lunch: 1,
        dinner: 2
      }
    },
    {
      id: '1',
      date: moment('2016-09-02', 'YYYY-MM-DD'),
      mealIds: {
        breakfast: 0,
        lunch: 1,
        dinner: 2
      }
    }
  ],
  meals: {
    0: { // 9/1/16 breakfast
      id: '0',
      peopleDistribution: {
        0: 'home',
        1: 'outside food',
        2: 'home',
        3: 'home'
      },
      dishDistribution: {
        0: { "-KSbVHP_Y2P1YUOSuTq2": 1 },
        2: { "-KSbV1X_jqdD1dO1Rns5": 1 },
        3: { "-KSbV1X_jqdD1dO1Rns5": 1 }
      }
    },
    1: { // 9/1/16 lunch
      id: '0',
      peopleDistribution: {
        0: 'home',
        1: 'outside food',
        2: 'packed food',
        3: 'home'
      },
      dishDistribution: {
        0: { "-KSbV1X_jqdD1dO1Rns5": 2 },
        2: { "-KSbV1X_jqdD1dO1Rns5": 1 },
        3: { "-KSbV1X_jqdD1dO1Rns5": 1 }
      }
    },
    2: { // 9/1/16 dinner
      id: '0',
      peopleDistribution: {
        0: 'home',
        1: 'home',
        2: 'home',
        3: 'home'
      },
      dishDistribution: {
        0: {
          "-KSYl6PokYyB8MYB6bHm": 1,
          "-KSbV7yPwj3M3olk4sR0": 1
        },
        1: {
          "-KSYl6PokYyB8MYB6bHm": 1,
          "-KSbV7yPwj3M3olk4sR0": 1
        },
        2: {
          "-KSYl6PokYyB8MYB6bHm": 0.75,
          "-KSbV7yPwj3M3olk4sR0": 0.75
        },
        3: {
          "-KSYl6PokYyB8MYB6bHm": 0.5,
          "-KSbV7yPwj3M3olk4sR0": 0.5
        }
      }
    }
  },
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
  // dishes: {
  //   0: {
  //     id: '0',
  //     name: 'broccoli beef stir fry',
  //     ingredientIds: [0, 1]
  //   },
  //   1: {
  //     id: '1',
  //     name: 'rice',
  //     ingredientIds: [2]
  //   },
  //   2: {
  //     id: '2',
  //     name: 'protein bar',
  //     ingredientIds: [3]
  //   },
  //   3: {
  //     id: '3',
  //     name: 'banana',
  //     ingredientIds: [4]
  //   }
  // },
  // ingredients: {
  //   0: {
  //     id: '0',
  //     name: 'broccoli',
  //     unit: 'bunch'
  //   },
  //   1: {
  //     id: '1',
  //     name: 'flank steak',
  //     unit: 'pound'
  //   },
  //   2: {
  //     id: '2',
  //     name: 'rice'
  //   },
  //   3: {
  //     id: '3',
  //     name: 'protein bar'
  //   },
  //   4: {
  //     id: '4',
  //     name: 'banana'
  //   }
  // }
};

const store = createStore(reducer, initialState, applyMiddleware(thunk));

export default store;

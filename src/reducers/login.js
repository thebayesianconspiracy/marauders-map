import Immutable from 'immutable';
import _ from 'lodash';

let admin;

try {
  admin = JSON.parse(localStorage.admin);
} catch(e) {
  admin = null;
}

////////////////////////
///// INITIAL STATE ////
////////////////////////


let initialStateTemp = {};

try {
  initialStateTemp = JSON.parse(localStorage.login);
} catch(e) {
  console.log('parsing error is', e);
  initialStateTemp = {
    username: localStorage.username,
    password: localStorage.password,
    admin,
    data: {
      entityType: 1,
      farmerType: 1,
      entityName: localStorage.username
    },
    bids: [
      {
        created: 1516642451312 - 3 * 86400 * 1000,
        price: 100,
        lotId: _.random(0, 10000),
      },
      {
        created: 1516642421312 - 7 * 86400 * 1000,
        price: 300,
        lotId: _.random(0, 10000),
      },
      {
        created: 1516642151312 - 12 * 86400 * 1000,
        price: 200,
        lotId: _.random(0, 10000),
      },
    ]
  };
}

const initialState = Immutable.Map(initialStateTemp);

///////////////////////////
/// ACTION-REDUCER MAP ////
//////////////////////////
export const REDUCERS = {
  LOGIN: (state, { username, password, admin }) => state.merge({ username, password, admin }),
  ADD_USER_INFO: (state, data) => state.merge(data),
  ADD_BID_INFO: (state, data) => state.merge(data),
};

//////////////////////////
///// EXPORT REDUCER /////
//////////////////////////
const reducer = (state = initialState, action = {}) => {
  const { type } = action;
  if (REDUCERS[type])
    return REDUCERS[type](state, action.payload);
  return state;
};


export default (state = initialState, action = {}) => {
  const newState = reducer(state, action);
  localStorage.login = JSON.stringify(newState.toJS())
  return newState;
}

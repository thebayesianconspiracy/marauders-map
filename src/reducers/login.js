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
const initialState = Immutable.Map({
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
      lotId: 1,
    },
    {
      created: 1516642421312 - 7 * 86400 * 1000,
      price: 300,
      lotId: 2,
    },
    {
      created: 1516642151312 - 12 * 86400 * 1000,
      price: 200,
      lotId: 3,
    },
  ]
});

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
export default (state = initialState, action = {}) => {
  const { type } = action;
  if (REDUCERS[type])
    return REDUCERS[type](state, action.payload);
  return state;
};

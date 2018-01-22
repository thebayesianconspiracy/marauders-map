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
  }
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

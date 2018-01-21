import Immutable from 'immutable';
import _ from 'lodash';

////////////////////////
///// INITIAL STATE ////
////////////////////////
const initialState = Immutable.Map({
  
});

///////////////////////////
/// ACTION-REDUCER MAP ////
//////////////////////////
export const REDUCERS = {
  LOGIN: (state, { username, password }) => state.merge({ username, password }),
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

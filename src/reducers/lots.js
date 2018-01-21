import Immutable from 'immutable';
import _ from 'lodash';

////////////////////////
///// INITIAL STATE ////
////////////////////////
const initialState = Immutable.Map({
  lots: []
});

///////////////////////////
/// ACTION-REDUCER MAP ////
//////////////////////////
export const REDUCERS = {
  ADD_LOTS: (state, { data }) => state.updateIn(['lots'], lots => lots.concat(data)),
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

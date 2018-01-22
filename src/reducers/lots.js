import Immutable from 'immutable';
import _ from 'lodash';

////////////////////////
///// INITIAL STATE ////
////////////////////////
const initialState = Immutable.Map({
  lots: [
    {
      created: 1516642451312 - 5 * 86400 * 1000,
      location: 'Rajasthan',
      bids: 5,
      id: 1,
    },
    {
      created: 1516642421312 - 10 * 86400 * 1000,
      location: 'Jammu',
      bids: 3,
      id: 2,
    },
    {
      created: 1516642151312 - 17 * 86400 * 1000,
      location: 'Sri Lanka',
      bids: 2,
      id: 3,
    },
  ]
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

import Immutable from 'immutable';
import _ from 'lodash';

////////////////////////
///// INITIAL STATE ////
////////////////////////

let initialStateTemp = {};

try {
  initialStateTemp = JSON.parse(localStorage.lotState);
} catch(e) {
  console.log('parsing error is', localStorage.lotState);
  initialStateTemp = {
    lots: [
      {
        created: 1516642451312 - 5 * 86400 * 1000,
        location: 'Rajasthan',
        id: 1,
        status: 'created',
      },
      {
        created: 1516642421312 - 10 * 86400 * 1000,
        location: 'Jammu',
        id: 2,
        status: 'created',
      },
      {
        created: 1516642151312 - 17 * 86400 * 1000,
        location: 'Sri Lanka',
        id: 3,
        status: 'created',
      },
    ]
  };
}

const initialState = Immutable.Map(initialStateTemp);

///////////////////////////
/// ACTION-REDUCER MAP ////
//////////////////////////
export const REDUCERS = {
  ADD_LOTS: (state, { data }) => state.updateIn(['lots'], lots => lots.concat(data)),
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
  localStorage.lotState = JSON.stringify(newState.toJS());
  return newState;
}

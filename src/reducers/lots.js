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
        status: 'For Sale',
      },
      {
        created: 1516642421312 - 10 * 86400 * 1000,
        location: 'Jammu',
        id: 2,
        status: 'Created',
      },
      {
        created: 1516642151312 - 17 * 86400 * 1000,
        location: 'Sri Lanka',
        id: 3,
        status: 'Created',
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
  SELL_LOTS: (state, { data, amount }) => state.updateIn(['lots'], lots => {
    return _.map(lots, lot => {
      console.log(data, lot.id);
      if (_.has(data, lot.id)) {
        lot.status = 'For Sale';
        lot.amount = amount;
      }
      return lot;
    });
  }),
  BID_LOTS: (state, { data, amount }) => state.updateIn(['lots'], lots => {
    return _.map(lots, lot => {
      console.log(data, lot.id);
      if (_.has(data, lot.id)) {
        lot.status = 'Bid! Amount: ' + amount;
      }
      return lot;
    });
  }),
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

import utils from './utils';
import { Router, Route, browserHistory, Link } from 'react-router';
import async from 'async';
import _ from 'lodash';

const entityTypeEnums = {
  NULL: 0,
  Farmer: 1,
  Govt: 2,
  Transporter: 3,
  Retail_Stores: 4
};

const farmerTypeEnums = {
  NULL: 0,
  Organic: 1,
  Regular: 2
};

const lotTypeEnums = {
  Organic: 0,
  Regular: 1
}

const lotStateEnums = {
  Created: 0,
  ForSale: 1,
  BuyerFound: 2,
  InTransit: 3,
  Received: 4
}

export function sellLots({ lots, amount }) {
  return (dispatch, getState) => {
    dispatch({
      type: 'SELL_LOTS',
      payload: { data: lots, amount },
    });
  }
}


export function addBids({ lots, amount }) {
  return (dispatch, getState) => {
    dispatch({
      type: 'BID_LOTS',
      payload: { data: lots, amount },
    });
  }
}

export function addLotsHack({ location }) {
  return (dispatch, getState) => {
    const data = [{
      location,
      created: Date.now(),
      id: _.random(0, 100000),
      status: 'Created'
    }];
    dispatch({
      type: 'ADD_LOTS',
      payload: { data },
    });
  }
}

export function getLots(query) {
  return async function (dispatch, getState) {
    try {
      const data = await utils.search("Lot?ownerAddress=eq." + query);
      dispatch({
        type: 'ADD_LOTS',
        payload: { data },
      });
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}


export function addLots({ created, location, num }) {
  return async function (dispatch, getState) {
    const state = getState().login.toJS();
    const admin = state.admin;
    console.log('admin is', admin);
    try {
      for(let i = 0;i < num; i++) {
        const args = {
          created,
          location
        };
        console.log('args are', args);
        
        const promise = await utils.triggerContract(admin, 'LotManager', 'createLot', args);

        console.log('contract is', promise);
      }
      browserHistory.replace("/")
      
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

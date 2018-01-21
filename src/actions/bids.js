import utils from './utils';
import { Router, Route, browserHistory, Link } from 'react-router';
import async from 'async';

export function addBid(lotAddresses, amount) {
  return async function (dispatch, getState) {

    const state = getState().login.toJS();
    const admin = state.admin;
    console.log('admin is', admin);

    try {
      const args = {
        lotAddresses,
        amount
      };
      console.log('add bids args are', args);
      const promise = await utils.triggerContract(admin, 'LotManager', 'createBid', args);
      console.log('contract is', promise);
    } catch(e) {
    console.log('Error logging in is', e);
  }

}

}

export function getBids(query) {
  return async function (dispatch, getState) {
    try {
      const bids = await utils.search("Bid?creatorAddress=eq." + query);
      console.log('received bids', bids);
      dispatch({
        type: 'ADD_BIDS',
        payload: { bids },
      });
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

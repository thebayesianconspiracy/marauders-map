import utils from './utils';
import { Router, Route, browserHistory, Link } from 'react-router';

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

window.logout = function() {
  delete localStorage.username;
}

export function getLots(query) {
  return async function (dispatch, getState) {
    try {
      const lots = await utils.search(query);
      console.log('lots are', lots);
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

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
  delete localStorage.login;
  delete localStorage.lotState;
  browserHistory.replace("/")
}

export function login({ username, password, entityType, farmerType }) {
  return async function (dispatch, getState) {
    try {
      /* const admin = await utils.signUp(username, password);
       * console.log('admin is', admin);
       * const contract = await utils.triggerContract(admin, 'EntityManager', 'createEntity', {
       *   entityName: admin.name,
       *   pwHash: admin.password,
       *   entityType: entityTypeEnums[entityType] || 0,
       *   farmerType: farmerTypeEnums[farmerType] || 0
       * });
       * console.log('response is', contract);*/
      const admin = {
        name: username,
        password,
        address: 'wlkejrslkcvjs',
      };
      localStorage.username = username;
      localStorage.password = password;
      localStorage.admin = JSON.stringify(admin);
      dispatch({
        type: 'LOGIN',
        payload: { username, password, admin },
      });
      browserHistory.replace("/")
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

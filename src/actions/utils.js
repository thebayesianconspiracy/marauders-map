import ba from 'blockapps-rest-mod';
const { rest, common } = ba;
const { util, config, Promise } = common;
const co = require('co');
const _ = require('lodash');

async function signUp(name, password) {
  const admin = rest.createUser(name, password);
  const value = await co(admin);
  const fillUser = await co(rest.fillUser(value.name, value.address));
  return value;
}


async function search(query) {
  const admin = rest.query2(query || "");
  const value = await co(admin);
  return value;
}


async function triggerContract(admin, name, method, args) {
  const contractAddress = await co(rest.query(name));
  const contract = {
    name,
    address: _.first(contractAddress)
  }
  const caller = await co(rest.callMethod(admin, contract, method, args));
  return contract;
}

function getUserInfo(username) {
  return async function(dispatch, getState) {
    try {
      const userInfos = await search("Entity2?entityName=eq." + username);
      const data = _.first(userInfos);
      dispatch({
        type: 'ADD_USER_INFO',
        payload: { data },
      });
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

export default {
  signUp,
  triggerContract,
  search,
  getUserInfo
};

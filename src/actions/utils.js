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
  const admin = rest.query(query || "");
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

export default {
  signUp,
  triggerContract,
  search
};

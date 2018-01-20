import ba from 'blockapps-rest-mod';
const { rest, common } = ba;
const { util, config, Promise } = common;
const co = require('co');

async function signUp(name, password) {
  const admin = rest.createUser(name, password);
  const value = await co(admin);
  const fillUser = await co(rest.fillUser(value.name, value.address));
  return fillUser;
}

async function triggerContract(admin, name, method, args) {
  const contractAddress = await co(rest.query(name));
  const contract = {
    name,
    address: contractAddress[0]
  }
  const caller = await co(rest.callMethod(admin, contract, method, args));
  return contract;
}

export default {
  signUp,
  triggerContract
};

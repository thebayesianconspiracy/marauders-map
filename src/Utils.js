import ba from 'blockapps-rest-mod';
const { rest, common } = ba;
const { util, config, Promise } = common;
const co = require('co');

async function start() {
  const admin = rest.createUser('abc', 'abc');
  const value = await co(admin);
  console.log('value is', value);
  const set = 'set';
  const args = {
    x: 22
  };
  const contractName = 'SimpleStorage';
  const contractAddress = await co(rest.query(contractName));
  const contract = {
    name: contractName,
    address: contractAddress[0]
  }
  const fillUser = await co(rest.fillUser(value.name, value.address));
  const caller = await co(rest.callMethod(value, contract, set, args));
}

export default {
  start
};

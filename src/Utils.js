import ba from 'blockapps-rest-mod';
const { rest, common } = ba;
const { util, config, Promise } = common;
const co = require('co');

async function start() {
  const admin = rest.createUser('fernandes', 'lololotrol');
  const value = await co(admin);
  console.log('value is', value);
  const set = 'set';
  const args = {
    x: 22
  };
  const contractName = 'SimpleStorage';
  console.log('Admin is', value);
  const contractAddress = await co(rest.isCompiled(contractName));
  const contract = {
    name: contractName,
    address: contractAddress
  }
  /* const caller = await co(rest.callMethod(value, contract, set, args));*/
  console.log('contract is ', contract);
}

export default {
  start
};

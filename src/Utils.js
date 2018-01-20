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
    storedData: '22'
  };
  console.log('Admin is', value);
  const caller = await co(rest.callMethod(value,'SimpleStorage', set, args));
  console.log('Caller is', caller);
}

export default {
  start
};

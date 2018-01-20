import ba from 'blockapps-rest-mod';
const { rest, common } = ba;
const { util, config, Promise } = common;

function* start() {
  const admin = rest.createUser('fernandes', 'lololotrol').next();
  const createFucker = 'Ffucker';
  const args = {
    _account: 'ABC',
    _username: 'vivek',
    _dicksize: 6,
    _pwHash: 'hash',
    _id: 1
  };

  yield rest.callMethod(admin,'Ffucker', createFucker, args).next();
}

export default {
  start
};

import ba from 'blockapps-rest-mod';
const { util, config, Promise, rest } = ba;

const obj = {};

obj.createUser = function*(username, password) {
  yield rest.createUser(username, password);
}

obj.createFucker = function*(admin) {
  rest.verbose('createFucker');
  const createFucker = 'Ffucker';
  const args = {
    _account: 'ABC',
    _username: 'vivek',
    _dicksize: 6,
    _pwHash: 'hash',
    _id: 1
  };

  yield rest.callMethod(admin,'Ffucker', obj.createFucker, args);
}

obj.start = function* () {
  const admin = yield obj.createUser('fernandes', 'lololotrol');
  console.log('Admin is', admin);
  const result = yield obj.createFucker(admin);
  console.log('Result is', result);
}

export default obj;

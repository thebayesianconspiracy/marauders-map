import utils from './utils';

export function login({ username, password }) {
  return async function (dispatch, getState) {
    try {
      const admin = await utils.signUp(username, password);
      const contract = await utils.triggerContract(admin, 'EntityManager', 'createEntity', {
        username: admin.username,
        password: admin.password,
        entityType: 'Farmer',
        farmerType: 'Organic',
        pubKey: 'sldkjsldkfj',
      });
      console.log('response is', contract);
      dispatch({
        type: 'LOGIN',
        payload: { username, password },
      });
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

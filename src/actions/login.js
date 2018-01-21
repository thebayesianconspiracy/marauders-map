import utils from './utils';

export function login({ username, password }) {
  return async function (dispatch, getState) {
    try {
      const result = await utils.signUp(username, password);
      console.log('result is', result);
      dispatch({
        type: 'LOGIN',
        payload: { username, password },
      });
    } catch(e) {
      console.log('Error logging in is', e);
    }
  }
}

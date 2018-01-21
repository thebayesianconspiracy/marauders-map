export function login({ username, password }) {
  return (dispatch, getState) => {
    console.log(username, password);
    dispatch({
      type: 'LOGIN',
      payload: { username, password },
    });
  }
}

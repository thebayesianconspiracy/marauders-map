import { combineReducers } from "redux";
import { routerReducer } from 'react-router-redux'
import login from './login';
import lots from './lots';

export default combineReducers({
  login,
  lots,
  routing: routerReducer
});

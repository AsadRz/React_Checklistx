import { combineReducers } from 'redux';
import authReducer from './auth';
import viewReducer from './view';

const rootReducer = combineReducers({
  auth: authReducer,
  view: viewReducer,
});

export default rootReducer;

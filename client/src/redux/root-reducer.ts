import { combineReducers } from 'redux';
import { StateType } from 'typesafe-actions';

import authRedirectReducer from './authRedirect/reducer';

const rootReducer = combineReducers({
  authRedirect: authRedirectReducer,
});

export default rootReducer;
export type RootState = StateType<typeof rootReducer>;

import { combineReducers } from 'redux';
import { createReducer } from 'typesafe-actions';

import {
  clearAuthRedirectLocation, setAuthRedirectLocation,
} from './actions';

export const authRedirectLocation = createReducer(null as string | null)
  .handleAction(
    setAuthRedirectLocation,
    (_state, action) => action.payload,
  )
  .handleAction(
    clearAuthRedirectLocation,
    () => null,
  );

const authRedirectReducer = combineReducers({
  authRedirectLocation,
});

export default authRedirectReducer;
export type AuthRedirectState = ReturnType<typeof authRedirectReducer>;

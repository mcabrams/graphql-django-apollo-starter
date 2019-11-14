import { createAction } from 'typesafe-actions';

export const setAuthRedirectLocation = createAction(
  '@@authRedirect/SET_AUTH_REDIRECT_LOCATION',
)<string>();

export const clearAuthRedirectLocation = createAction(
  '@@authRedirect/CLEAR_AUTH_REDIRECT_LOCATION',
)();

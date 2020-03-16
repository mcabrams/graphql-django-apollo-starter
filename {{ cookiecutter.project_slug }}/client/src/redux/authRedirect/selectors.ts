import { AuthRedirectState } from './reducer';

export const getAuthRedirectLocation = (state: AuthRedirectState) => (
  state.authRedirectLocation
);

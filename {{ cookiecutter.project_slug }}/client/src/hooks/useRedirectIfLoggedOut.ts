import { NavigateFn } from '@reach/router';
import { useDispatch } from 'react-redux';

import { ROUTES } from '@src/constants/routes';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { setAuthRedirectLocation } from '@src/redux/authRedirect/actions';

export const useRedirectIfLoggedOut = (
  redirectAfterLoginLocation: string,
  navigate?: NavigateFn,
) => {
  const isLoggedIn = useIsLoggedIn()[0];
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    dispatch(setAuthRedirectLocation(redirectAfterLoginLocation));
    // TODO: Raise error here if navigate not defined
    if (navigate) {
      navigate(ROUTES.signup);
    }
  }
};

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigateFn } from '@reach/router';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { clearAuthRedirectLocation } from '@src/redux/authRedirect/actions';
import { getAuthRedirectLocation } from '@src/redux/authRedirect/selectors';
import { useTypedSelector } from '@src/redux/use-typed-selector';

export const useRedirectIfLoggedIn = (
  navigate?: NavigateFn,
) => {
  const isLoggedIn = useIsLoggedIn()[0];
  const dispatch = useDispatch();
  const authRedirectLocation = useTypedSelector(
    state => getAuthRedirectLocation(state.authRedirect),
  );

  useEffect(
    () => {
      // TODO: Raise error here if navigate not defined
      if (isLoggedIn && navigate) {
        navigate(authRedirectLocation || '/').then(
          () => dispatch(clearAuthRedirectLocation()),
        );
      }
    },
    // TODO: Figure out if there's actually an issue with the warning below
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoggedIn],
  );
};

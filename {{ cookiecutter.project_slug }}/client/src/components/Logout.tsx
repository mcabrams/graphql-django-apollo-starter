import { Button } from 'antd';
import React from 'react';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { useLogoutMutation } from '@src/generated/graphql';

interface LogoutProps {}

export const Logout: React.FC<LogoutProps> = () => {
  const setIsLoggedIn = useIsLoggedIn()[1];
  const logout = useLogoutMutation({
    onCompleted: () => setIsLoggedIn && setIsLoggedIn(false),
  })[0];

  return (
    <Button
      onClick={() => logout()}
      data-testid="logout-button"
    >
      Logout
    </Button>
  );
};

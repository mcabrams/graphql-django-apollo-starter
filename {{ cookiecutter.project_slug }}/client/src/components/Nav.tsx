import { Menu } from 'antd';
import React from 'react';
import { Link } from '@reach/router';

import { Logout } from '@src/components/Logout';
import { ROUTES } from '@src/constants/routes';
import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';

interface NavProps {}

export const Nav: React.FC<NavProps> = () => {
  const isLoggedIn = useIsLoggedIn()[0];

  return (
    <Menu mode="horizontal" style={{ lineHeight: '64px' }} theme="dark">
      <Menu.Item>
        <Link to={ROUTES.home}>Home</Link>
      </Menu.Item>
      <Menu.Item>
        <Link to={ROUTES.protected} data-testid="protected-route-nav-link">Protected</Link>
      </Menu.Item>
      {!isLoggedIn ? (
        <Menu.SubMenu
          title="Login/Signup"
          data-testid="auth-dropdown-nav-link"
        >
          <Menu.Item>
            <Link to={ROUTES.login} data-testid="login-nav-link">Login</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={ROUTES.signup} data-testid="signup-nav-link">Signup</Link>
          </Menu.Item>
        </Menu.SubMenu>
      ) : (
        <Menu.Item>
          <Logout />
        </Menu.Item>
      )}
      <Menu.Item>
        <Link to={ROUTES['user-list']}>User List</Link>
      </Menu.Item>
    </Menu>
  );
};

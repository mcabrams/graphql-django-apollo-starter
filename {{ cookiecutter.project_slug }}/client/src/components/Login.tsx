import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import { useTokenAuthMutation } from '@src/generated/graphql';
import { useRedirectIfLoggedIn } from '@src/hooks/useRedirectIfLoggedIn';

interface LoginFormProps extends FormComponentProps {
  password: string;
  email: string;
}

type LoginProps = RouteComponentProps<LoginFormProps>;

export const Login: React.FC<LoginProps> = ({ navigate }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const setIsLoggedIn = useIsLoggedIn()[1];
  useRedirectIfLoggedIn(navigate);

  const tokenAuth = useTokenAuthMutation({
    variables: { email, password },
    // TODO: Raise error here if setIsLoggedIn is not defined
    onCompleted: () => setIsLoggedIn && setIsLoggedIn(true),
  })[0];

  const itemLayout = {
    labelCol: { span: 1 },
    wrapperCol: { span: 4 },
  };

  const tailLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 4, offset: 1 },
  };

  return (
    <Form
      labelCol={itemLayout.labelCol}
      wrapperCol={itemLayout.wrapperCol}
      onSubmit={e => {
        e.preventDefault();
        tokenAuth();
      }}
    >
      <Form.Item label="Email">
        <Input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          data-testid="email-input"
        />
      </Form.Item>
      <Form.Item label="Password">
        <Input.Password
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          data-testid="password-input"
        />
      </Form.Item>
      <Form.Item
        labelCol={tailLayout.labelCol}
        wrapperCol={tailLayout.wrapperCol}
      >
        <Button htmlType="submit" data-testid="login-submit-button">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

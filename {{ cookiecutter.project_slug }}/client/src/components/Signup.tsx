import { Form, Input, Button } from 'antd';
import { FormComponentProps } from 'antd/es/form';
import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { useIsLoggedIn } from '@src/hooks/useIsLoggedIn';
import {
  CreateUserMutation, useCreateUserMutation, useTokenAuthMutation,
} from '@src/generated/graphql';
import { useRedirectIfLoggedIn } from '@src/hooks/useRedirectIfLoggedIn';

interface SignupFormProps extends FormComponentProps {
  username: string;
  password: string;
  email: string;
}

export const Signup: React.FC<RouteComponentProps<SignupFormProps>> = (
  { navigate },
) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const setIsLoggedIn = useIsLoggedIn()[1];
  useRedirectIfLoggedIn(navigate);

  const [tokenAuth, { error }] = useTokenAuthMutation({
    variables: { email, password },
    // TODO: Raise error here if setIsLoggedIn is not defined
    onCompleted: () => setIsLoggedIn && setIsLoggedIn(true),
  });

  const requestToken = async (data: CreateUserMutation) => {
    /* TODO: This should raise error */
    if (!data.createUser) {
      return;
    }

    await tokenAuth();
  };

  const createUser = useCreateUserMutation({
    variables: { email, password, username },
    onCompleted: data => {
      requestToken(data);
    },
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
      layout="horizontal"
      onSubmit={e => {
        e.preventDefault();
        createUser();
      }}
      labelCol={itemLayout.labelCol}
      wrapperCol={itemLayout.wrapperCol}
    >
      <Form.Item label="User">
        <Input
          type="text"
          value={username}
          onChange={e => setUsername(e.target.value)}
          data-testid="username-input"
        />
      </Form.Item>
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
        <Button
          htmlType="submit"
          data-testid="signup-submit-button"
        >
          Signup
        </Button>
      </Form.Item>
      {error}
    </Form>
  );
};

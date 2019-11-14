import {
  Col, Row, Typography,
} from 'antd';
import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { ROUTES } from '@src/constants/routes';
import { useRedirectIfLoggedOut } from '@src/hooks/useRedirectIfLoggedOut';

type ProtectedProps = RouteComponentProps;

const { Title } = Typography;

export const Protected: React.FC<ProtectedProps> = ({ navigate }) => {
  useRedirectIfLoggedOut(ROUTES.protected, navigate);


  return (
    <Row gutter={16}>
      <Col span={6}>
        <Title data-testid="protected-route-heading">
          Protected
        </Title>
      </Col>
    </Row>
  );
};

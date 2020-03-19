import { Col, Row, Typography } from 'antd';
import React from 'react';
import { RouteComponentProps } from '@reach/router';

type HomeProps = RouteComponentProps;

const { Title } = Typography;

export const Home: React.FC<HomeProps> = () => (
  <Row>
    <Col span={24}>
      <Title data-testid="home">
        Hello world!
      </Title>
    </Col>
  </Row>
);

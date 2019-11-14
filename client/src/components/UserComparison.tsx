import {
  Col, Row, Typography, Spin,
} from 'antd';
import React from 'react';

import {
  UserComparisonQueryVariables, useUserComparisonQuery,
} from '@src/generated/graphql';

type UserComparisonProps = Pick<UserComparisonQueryVariables,
  'targetUserProfileId'>;

const { Title, Paragraph } = Typography;

export const UserComparison: React.FC<UserComparisonProps> = (
  { targetUserProfileId },
) => {
  const { data, loading } = useUserComparisonQuery({
    variables: {
      targetUserProfileId,
    },
  });

  return (
    <Row gutter={16}>
      <Title data-testid="find-doppelganger-heading">
        User Comparison
      </Title>
      <Col span={8}>
        <Title level={3} data-testid="find-doppelganger-heading">
          You answered
        </Title>
        <ul data-testid="source-answers">
          {data?.userComparison?.sourceUser?.sharedAnsweredQuestions?.map(
            answeredQuestion => (
              <li>
                <Paragraph>
                  {answeredQuestion?.question.text}
                </Paragraph>
                <Paragraph>
                  -----
                  {' '}
                  {answeredQuestion?.answer.text}
                </Paragraph>
              </li>
            ),
          )}
        </ul>
        {loading && <Spin />}
      </Col>
      <Col span={8}>
        <Title level={3} data-testid="find-doppelganger-heading">
          They answered
        </Title>
        <ul data-testid="target-answers">
          {data?.userComparison?.targetUser?.sharedAnsweredQuestions?.map(
            answeredQuestion => (
              <li>
                <Paragraph>
                  {answeredQuestion?.question.text}
                </Paragraph>
                <Paragraph>
                  -----
                  {' '}
                  {answeredQuestion?.answer.text}
                </Paragraph>
              </li>
            ),
          )}
        </ul>
        {loading && <Spin />}
      </Col>
    </Row>
  );
};

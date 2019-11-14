import {
  Alert, Button, Card, Col, Row, Typography,
} from 'antd';
import React, { useState } from 'react';
import { RouteComponentProps } from '@reach/router';

import { isDefined } from '@src/helpers/presence';
import { useRedirectIfLoggedOut } from '@src/hooks/useRedirectIfLoggedOut';
import {
  useCreateAnsweredQuestionMutation, useQuizQuery,
} from '@src/generated/graphql';

type QuizProps = RouteComponentProps;

const { Title } = Typography;

export const Quiz: React.FC<QuizProps> = ({ navigate }) => {
  useRedirectIfLoggedOut('/quiz', navigate);
  const { data } = useQuizQuery();
  const [questionIndex, setQuestionIndex] = useState(0);
  const [
    createAnsweredQuestion,
    { error },
  ] = useCreateAnsweredQuestionMutation({
    onCompleted: () => setQuestionIndex(questionIndex + 1),
  });

  const answerQuestion = (questionId: number, answerId: number) => (
    createAnsweredQuestion({
      variables: { answerId, questionId },
    })
  );

  const questionNodes = data && data.questions && data.questions.edges.map(
    question => (question && question.node),
  ).filter(isDefined);

  const question = questionNodes && questionNodes[questionIndex];


  return (
    <Row gutter={16}>
      <Col span={6}>
        <Title data-testid="quiz-heading">
          Quiz
        </Title>
        {question && (
          <Card>
            <p data-testid="quiz-question-text">{question.text}</p>
            <Row gutter={16} data-testid="quiz-answers">
              {question.answers.map(answer => (
                <Col key={answer.text} span={18}>
                  <Button
                    block
                    onClick={() => answerQuestion(question.pk, answer.pk)}
                    data-testid="quiz-answer-button"
                  >
                    {answer.text}
                  </Button>
                </Col>
              ))}
            </Row>
          </Card>
        )}
        {error && (
          <Alert
            message="Uh oh!"
            description={error.message}
            type="error"
          />
        )}
      </Col>
    </Row>
  );
};

import gql from 'graphql-tag';

export const CREATE_ANSWERED_QUESTION_MUTATION = gql`
  mutation CreateAnsweredQuestion($questionId: Int!, $answerId: Int!) {
    createAnsweredQuestion(questionId: $questionId, answerId: $answerId) {
      answeredQuestion {
        ...CreateAnsweredQuestionResponse
      }
    }
  }
  fragment CreateAnsweredQuestionResponse on AnsweredQuestionType {
    id
  }
`;

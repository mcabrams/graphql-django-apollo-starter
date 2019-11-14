import gql from 'graphql-tag';

export const QUIZ_QUERY = gql`
  query Quiz {
    questions(omitAnsweredQuestions: true) {
      edges {
        node {
          ...QuizResponse
        }
      }
    }
  }
  fragment QuizResponse on QuestionType {
    id
    pk
    text
    answers {
      pk
      text
    }
  }
`;

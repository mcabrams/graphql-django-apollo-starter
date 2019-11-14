import gql from 'graphql-tag';

export const USER_COMPARISON_QUERY = gql`
  query UserComparison($targetUserProfileId: Int!) {
    userComparison(targetUserProfileId: $targetUserProfileId) {
      sourceUser {
        ...UserComparisonResponse
      }
      targetUser {
        ...UserComparisonResponse
      }
    }
  }
  fragment UserComparisonResponse on UserComparisonUserType {
      sharedAnsweredQuestions {
          question {
              pk
              text
          }
          answer {
              id
              text
          }
      }
  }
`;

import gql from 'graphql-tag';

export const USERS_QUERY = gql`
  query Users {
    users {
      edges {
        node {
          ...UsersResponse
        }
      }
    }
  }
  fragment UsersResponse on UserPublicType {
    username
  }
`;

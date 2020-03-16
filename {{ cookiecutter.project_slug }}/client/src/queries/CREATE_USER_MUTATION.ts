import gql from 'graphql-tag';

export const CREATE_USER_MUTATION = gql`
  mutation CreateUser($email: String!, $password: String!, $username: String!) {
    createUser(email: $email, password: $password, username: $username) {
      ...CreateUserResponse
    }
  }
  fragment CreateUserResponse on CreateUser {
    user {
      email
      username
    }
  }
`;

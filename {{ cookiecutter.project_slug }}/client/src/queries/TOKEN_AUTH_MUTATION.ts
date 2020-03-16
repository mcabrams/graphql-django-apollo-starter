import gql from 'graphql-tag';

export const TOKEN_AUTH_MUTATION = gql`
  mutation TokenAuth($email: String!, $password: String!) {
    tokenAuth(email: $email, password: $password) {
      ...TokenAuthResponse
    }
  }
  fragment TokenAuthResponse on ObtainJSONWebToken {
    token
    refreshToken
  }
`;

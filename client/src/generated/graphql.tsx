/* THIS IS A GENERATED FILE - DO NOT MODIFY */
import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;

/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
  GenericScalar: any,
};

export type CreateUser = {
   __typename?: 'CreateUser',
  user?: Maybe<UserType>,
};


/** The real action happens in our custom GraphQLView  */
export type Logout = {
   __typename?: 'Logout',
  noop?: Maybe<Scalars['Boolean']>,
};

export type Mutation = {
   __typename?: 'Mutation',
  createUser?: Maybe<CreateUser>,
  /** The real action happens in our custom GraphQLView  */
  logout?: Maybe<Logout>,
  /** Obtain JSON Web Token mutation */
  tokenAuth?: Maybe<ObtainJsonWebToken>,
  verifyToken?: Maybe<Verify>,
  refreshToken?: Maybe<Refresh>,
  revokeToken?: Maybe<Revoke>,
};


export type MutationCreateUserArgs = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String']
};


export type MutationTokenAuthArgs = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type MutationVerifyTokenArgs = {
  token: Scalars['String']
};


export type MutationRefreshTokenArgs = {
  refreshToken: Scalars['String']
};


export type MutationRevokeTokenArgs = {
  refreshToken: Scalars['String']
};

/** An object with an ID */
export type Node = {
  /** The ID of the object. */
  id: Scalars['ID'],
};

/** Obtain JSON Web Token mutation */
export type ObtainJsonWebToken = {
   __typename?: 'ObtainJSONWebToken',
  token?: Maybe<Scalars['String']>,
  refreshToken?: Maybe<Scalars['String']>,
};

/** The Relay compliant `PageInfo` type, containing data necessary to paginate this connection. */
export type PageInfo = {
   __typename?: 'PageInfo',
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'],
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'],
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>,
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>,
};

export type Query = {
   __typename?: 'Query',
  users?: Maybe<UserPublicConnection>,
  protectedUsers?: Maybe<UserConnection>,
};


export type QueryUsersArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryProtectedUsersArgs = {
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};

export type Refresh = {
   __typename?: 'Refresh',
  token?: Maybe<Scalars['String']>,
  payload?: Maybe<Scalars['GenericScalar']>,
  refreshToken?: Maybe<Scalars['String']>,
};

export type Revoke = {
   __typename?: 'Revoke',
  revoked?: Maybe<Scalars['Int']>,
};

export type UserConnection = {
   __typename?: 'UserConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserEdge>>,
};

/** A Relay edge containing a `User` and its cursor. */
export type UserEdge = {
   __typename?: 'UserEdge',
  /** The item at the end of the edge */
  node?: Maybe<UserType>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type UserPublicConnection = {
   __typename?: 'UserPublicConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<UserPublicEdge>>,
};

/** A Relay edge containing a `UserPublic` and its cursor. */
export type UserPublicEdge = {
   __typename?: 'UserPublicEdge',
  /** The item at the end of the edge */
  node?: Maybe<UserPublicType>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type UserPublicType = Node & {
   __typename?: 'UserPublicType',
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
  /** The ID of the object. */
  id: Scalars['ID'],
};

export type UserType = Node & {
   __typename?: 'UserType',
  password: Scalars['String'],
  /** Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only. */
  username: Scalars['String'],
  email: Scalars['String'],
  /** The ID of the object. */
  id: Scalars['ID'],
};

export type Verify = {
   __typename?: 'Verify',
  payload?: Maybe<Scalars['GenericScalar']>,
};

export type CreateUserMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String'],
  username: Scalars['String']
};


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: Maybe<(
    { __typename?: 'CreateUser' }
    & CreateUserResponseFragment
  )> }
);

export type CreateUserResponseFragment = (
  { __typename?: 'CreateUser' }
  & { user: Maybe<(
    { __typename?: 'UserType' }
    & Pick<UserType, 'email' | 'username'>
  )> }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & { logout: Maybe<(
    { __typename?: 'Logout' }
    & Pick<Logout, 'noop'>
  )> }
);

export type TokenAuthMutationVariables = {
  email: Scalars['String'],
  password: Scalars['String']
};


export type TokenAuthMutation = (
  { __typename?: 'Mutation' }
  & { tokenAuth: Maybe<(
    { __typename?: 'ObtainJSONWebToken' }
    & TokenAuthResponseFragment
  )> }
);

export type TokenAuthResponseFragment = (
  { __typename?: 'ObtainJSONWebToken' }
  & Pick<ObtainJsonWebToken, 'token' | 'refreshToken'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Maybe<(
    { __typename?: 'UserPublicConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'UserPublicEdge' }
      & { node: Maybe<(
        { __typename?: 'UserPublicType' }
        & UsersResponseFragment
      )> }
    )>> }
  )> }
);

export type UsersResponseFragment = (
  { __typename?: 'UserPublicType' }
  & Pick<UserPublicType, 'username'>
);

export const CreateUserResponseFragmentDoc = gql`
    fragment CreateUserResponse on CreateUser {
  user {
    email
    username
  }
}
    `;
export const TokenAuthResponseFragmentDoc = gql`
    fragment TokenAuthResponse on ObtainJSONWebToken {
  token
  refreshToken
}
    `;
export const UsersResponseFragmentDoc = gql`
    fragment UsersResponse on UserPublicType {
  username
}
    `;
export const CreateUserDocument = gql`
    mutation CreateUser($email: String!, $password: String!, $username: String!) {
  createUser(email: $email, password: $password, username: $username) {
    ...CreateUserResponse
  }
}
    ${CreateUserResponseFragmentDoc}`;
export type CreateUserMutationFn = ApolloReactCommon.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = ApolloReactCommon.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout {
    noop
  }
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const TokenAuthDocument = gql`
    mutation TokenAuth($email: String!, $password: String!) {
  tokenAuth(email: $email, password: $password) {
    ...TokenAuthResponse
  }
}
    ${TokenAuthResponseFragmentDoc}`;
export type TokenAuthMutationFn = ApolloReactCommon.MutationFunction<TokenAuthMutation, TokenAuthMutationVariables>;

/**
 * __useTokenAuthMutation__
 *
 * To run a mutation, you first call `useTokenAuthMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTokenAuthMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [tokenAuthMutation, { data, loading, error }] = useTokenAuthMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useTokenAuthMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TokenAuthMutation, TokenAuthMutationVariables>) {
        return ApolloReactHooks.useMutation<TokenAuthMutation, TokenAuthMutationVariables>(TokenAuthDocument, baseOptions);
      }
export type TokenAuthMutationHookResult = ReturnType<typeof useTokenAuthMutation>;
export type TokenAuthMutationResult = ApolloReactCommon.MutationResult<TokenAuthMutation>;
export type TokenAuthMutationOptions = ApolloReactCommon.BaseMutationOptions<TokenAuthMutation, TokenAuthMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    edges {
      node {
        ...UsersResponse
      }
    }
  }
}
    ${UsersResponseFragmentDoc}`;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
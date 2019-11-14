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
  /** 
 * The `GenericScalar` scalar type represents a generic
   * GraphQL scalar value that could be:
   * String, Boolean, Int, Float, List or Object.
 **/
  GenericScalar: any,
};

export type AnsweredQuestionType = {
   __typename?: 'AnsweredQuestionType',
  id: Scalars['ID'],
  question: QuestionType,
  answer: AnswerType,
};

export type AnswerType = {
   __typename?: 'AnswerType',
  id: Scalars['ID'],
  text: Scalars['String'],
  pk: Scalars['Int'],
};

export type CreateAnsweredQuestion = {
   __typename?: 'CreateAnsweredQuestion',
  answeredQuestion?: Maybe<AnsweredQuestionType>,
};

export type CreateUser = {
   __typename?: 'CreateUser',
  user?: Maybe<UserType>,
};

export type DoppelgangerInfoType = {
   __typename?: 'DoppelgangerInfoType',
  score?: Maybe<Scalars['Float']>,
};

export type DoppelgangerType = {
   __typename?: 'DoppelgangerType',
  userProfile?: Maybe<UserProfileType>,
  doppelgangerInfo?: Maybe<DoppelgangerInfoType>,
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
  createAnsweredQuestion?: Maybe<CreateAnsweredQuestion>,
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


export type MutationCreateAnsweredQuestionArgs = {
  answerId?: Maybe<Scalars['Int']>,
  questionId?: Maybe<Scalars['Int']>
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
  questions?: Maybe<QuestionConnection>,
  computeDoppelganger?: Maybe<DoppelgangerType>,
  userComparison?: Maybe<UserComparisonType>,
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


export type QueryQuestionsArgs = {
  omitAnsweredQuestions?: Maybe<Scalars['Boolean']>,
  before?: Maybe<Scalars['String']>,
  after?: Maybe<Scalars['String']>,
  first?: Maybe<Scalars['Int']>,
  last?: Maybe<Scalars['Int']>
};


export type QueryComputeDoppelgangerArgs = {
  userProfileId?: Maybe<Scalars['Int']>
};


export type QueryUserComparisonArgs = {
  targetUserProfileId: Scalars['Int'],
  sourceUserProfileId?: Maybe<Scalars['Int']>
};

export type QuestionConnection = {
   __typename?: 'QuestionConnection',
  /** Pagination data for this connection. */
  pageInfo: PageInfo,
  /** Contains the nodes in this connection. */
  edges: Array<Maybe<QuestionEdge>>,
};

/** A Relay edge containing a `Question` and its cursor. */
export type QuestionEdge = {
   __typename?: 'QuestionEdge',
  /** The item at the end of the edge */
  node?: Maybe<QuestionType>,
  /** A cursor for use in pagination */
  cursor: Scalars['String'],
};

export type QuestionType = Node & {
   __typename?: 'QuestionType',
  /** The ID of the object. */
  id: Scalars['ID'],
  text: Scalars['String'],
  answers: Array<AnswerType>,
  pk: Scalars['Int'],
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

export type UserComparisonType = {
   __typename?: 'UserComparisonType',
  sourceUser?: Maybe<UserComparisonUserType>,
  targetUser?: Maybe<UserComparisonUserType>,
};

export type UserComparisonUserType = {
   __typename?: 'UserComparisonUserType',
  sharedAnsweredQuestions?: Maybe<Array<Maybe<AnsweredQuestionType>>>,
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

export type UserProfileType = {
   __typename?: 'UserProfileType',
  id: Scalars['ID'],
  user: UserPublicType,
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

export type ComputeDoppelgangerQueryVariables = {
  userProfileId?: Maybe<Scalars['Int']>
};


export type ComputeDoppelgangerQuery = (
  { __typename?: 'Query' }
  & { computeDoppelganger: Maybe<(
    { __typename?: 'DoppelgangerType' }
    & ComputeDoppelgangerResponseFragment
  )> }
);

export type ComputeDoppelgangerResponseFragment = (
  { __typename?: 'DoppelgangerType' }
  & { userProfile: Maybe<(
    { __typename?: 'UserProfileType' }
    & Pick<UserProfileType, 'id'>
    & { user: (
      { __typename?: 'UserPublicType' }
      & Pick<UserPublicType, 'username'>
    ) }
  )>, doppelgangerInfo: Maybe<(
    { __typename?: 'DoppelgangerInfoType' }
    & Pick<DoppelgangerInfoType, 'score'>
  )> }
);

export type CreateAnsweredQuestionMutationVariables = {
  questionId: Scalars['Int'],
  answerId: Scalars['Int']
};


export type CreateAnsweredQuestionMutation = (
  { __typename?: 'Mutation' }
  & { createAnsweredQuestion: Maybe<(
    { __typename?: 'CreateAnsweredQuestion' }
    & { answeredQuestion: Maybe<(
      { __typename?: 'AnsweredQuestionType' }
      & CreateAnsweredQuestionResponseFragment
    )> }
  )> }
);

export type CreateAnsweredQuestionResponseFragment = (
  { __typename?: 'AnsweredQuestionType' }
  & Pick<AnsweredQuestionType, 'id'>
);

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

export type QuizQueryVariables = {};


export type QuizQuery = (
  { __typename?: 'Query' }
  & { questions: Maybe<(
    { __typename?: 'QuestionConnection' }
    & { edges: Array<Maybe<(
      { __typename?: 'QuestionEdge' }
      & { node: Maybe<(
        { __typename?: 'QuestionType' }
        & QuizResponseFragment
      )> }
    )>> }
  )> }
);

export type QuizResponseFragment = (
  { __typename?: 'QuestionType' }
  & Pick<QuestionType, 'id' | 'pk' | 'text'>
  & { answers: Array<(
    { __typename?: 'AnswerType' }
    & Pick<AnswerType, 'pk' | 'text'>
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

export type UserComparisonQueryVariables = {
  targetUserProfileId: Scalars['Int']
};


export type UserComparisonQuery = (
  { __typename?: 'Query' }
  & { userComparison: Maybe<(
    { __typename?: 'UserComparisonType' }
    & { sourceUser: Maybe<(
      { __typename?: 'UserComparisonUserType' }
      & UserComparisonResponseFragment
    )>, targetUser: Maybe<(
      { __typename?: 'UserComparisonUserType' }
      & UserComparisonResponseFragment
    )> }
  )> }
);

export type UserComparisonResponseFragment = (
  { __typename?: 'UserComparisonUserType' }
  & { sharedAnsweredQuestions: Maybe<Array<Maybe<(
    { __typename?: 'AnsweredQuestionType' }
    & { question: (
      { __typename?: 'QuestionType' }
      & Pick<QuestionType, 'pk' | 'text'>
    ), answer: (
      { __typename?: 'AnswerType' }
      & Pick<AnswerType, 'id' | 'text'>
    ) }
  )>>> }
);

export const ComputeDoppelgangerResponseFragmentDoc = gql`
    fragment ComputeDoppelgangerResponse on DoppelgangerType {
  userProfile {
    id
    user {
      username
    }
  }
  doppelgangerInfo {
    score
  }
}
    `;
export const CreateAnsweredQuestionResponseFragmentDoc = gql`
    fragment CreateAnsweredQuestionResponse on AnsweredQuestionType {
  id
}
    `;
export const CreateUserResponseFragmentDoc = gql`
    fragment CreateUserResponse on CreateUser {
  user {
    email
    username
  }
}
    `;
export const QuizResponseFragmentDoc = gql`
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
export const UserComparisonResponseFragmentDoc = gql`
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
export const ComputeDoppelgangerDocument = gql`
    query ComputeDoppelganger($userProfileId: Int) {
  computeDoppelganger(userProfileId: $userProfileId) {
    ...ComputeDoppelgangerResponse
  }
}
    ${ComputeDoppelgangerResponseFragmentDoc}`;

/**
 * __useComputeDoppelgangerQuery__
 *
 * To run a query within a React component, call `useComputeDoppelgangerQuery` and pass it any options that fit your needs.
 * When your component renders, `useComputeDoppelgangerQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useComputeDoppelgangerQuery({
 *   variables: {
 *      userProfileId: // value for 'userProfileId'
 *   },
 * });
 */
export function useComputeDoppelgangerQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ComputeDoppelgangerQuery, ComputeDoppelgangerQueryVariables>) {
        return ApolloReactHooks.useQuery<ComputeDoppelgangerQuery, ComputeDoppelgangerQueryVariables>(ComputeDoppelgangerDocument, baseOptions);
      }
export function useComputeDoppelgangerLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ComputeDoppelgangerQuery, ComputeDoppelgangerQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ComputeDoppelgangerQuery, ComputeDoppelgangerQueryVariables>(ComputeDoppelgangerDocument, baseOptions);
        }
export type ComputeDoppelgangerQueryHookResult = ReturnType<typeof useComputeDoppelgangerQuery>;
export type ComputeDoppelgangerLazyQueryHookResult = ReturnType<typeof useComputeDoppelgangerLazyQuery>;
export type ComputeDoppelgangerQueryResult = ApolloReactCommon.QueryResult<ComputeDoppelgangerQuery, ComputeDoppelgangerQueryVariables>;
export const CreateAnsweredQuestionDocument = gql`
    mutation CreateAnsweredQuestion($questionId: Int!, $answerId: Int!) {
  createAnsweredQuestion(questionId: $questionId, answerId: $answerId) {
    answeredQuestion {
      ...CreateAnsweredQuestionResponse
    }
  }
}
    ${CreateAnsweredQuestionResponseFragmentDoc}`;
export type CreateAnsweredQuestionMutationFn = ApolloReactCommon.MutationFunction<CreateAnsweredQuestionMutation, CreateAnsweredQuestionMutationVariables>;

/**
 * __useCreateAnsweredQuestionMutation__
 *
 * To run a mutation, you first call `useCreateAnsweredQuestionMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAnsweredQuestionMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAnsweredQuestionMutation, { data, loading, error }] = useCreateAnsweredQuestionMutation({
 *   variables: {
 *      questionId: // value for 'questionId'
 *      answerId: // value for 'answerId'
 *   },
 * });
 */
export function useCreateAnsweredQuestionMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CreateAnsweredQuestionMutation, CreateAnsweredQuestionMutationVariables>) {
        return ApolloReactHooks.useMutation<CreateAnsweredQuestionMutation, CreateAnsweredQuestionMutationVariables>(CreateAnsweredQuestionDocument, baseOptions);
      }
export type CreateAnsweredQuestionMutationHookResult = ReturnType<typeof useCreateAnsweredQuestionMutation>;
export type CreateAnsweredQuestionMutationResult = ApolloReactCommon.MutationResult<CreateAnsweredQuestionMutation>;
export type CreateAnsweredQuestionMutationOptions = ApolloReactCommon.BaseMutationOptions<CreateAnsweredQuestionMutation, CreateAnsweredQuestionMutationVariables>;
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
export const QuizDocument = gql`
    query Quiz {
  questions(omitAnsweredQuestions: true) {
    edges {
      node {
        ...QuizResponse
      }
    }
  }
}
    ${QuizResponseFragmentDoc}`;

/**
 * __useQuizQuery__
 *
 * To run a query within a React component, call `useQuizQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuizQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuizQuery({
 *   variables: {
 *   },
 * });
 */
export function useQuizQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<QuizQuery, QuizQueryVariables>) {
        return ApolloReactHooks.useQuery<QuizQuery, QuizQueryVariables>(QuizDocument, baseOptions);
      }
export function useQuizLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<QuizQuery, QuizQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<QuizQuery, QuizQueryVariables>(QuizDocument, baseOptions);
        }
export type QuizQueryHookResult = ReturnType<typeof useQuizQuery>;
export type QuizLazyQueryHookResult = ReturnType<typeof useQuizLazyQuery>;
export type QuizQueryResult = ApolloReactCommon.QueryResult<QuizQuery, QuizQueryVariables>;
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
export const UserComparisonDocument = gql`
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
    ${UserComparisonResponseFragmentDoc}`;

/**
 * __useUserComparisonQuery__
 *
 * To run a query within a React component, call `useUserComparisonQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserComparisonQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserComparisonQuery({
 *   variables: {
 *      targetUserProfileId: // value for 'targetUserProfileId'
 *   },
 * });
 */
export function useUserComparisonQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UserComparisonQuery, UserComparisonQueryVariables>) {
        return ApolloReactHooks.useQuery<UserComparisonQuery, UserComparisonQueryVariables>(UserComparisonDocument, baseOptions);
      }
export function useUserComparisonLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UserComparisonQuery, UserComparisonQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UserComparisonQuery, UserComparisonQueryVariables>(UserComparisonDocument, baseOptions);
        }
export type UserComparisonQueryHookResult = ReturnType<typeof useUserComparisonQuery>;
export type UserComparisonLazyQueryHookResult = ReturnType<typeof useUserComparisonLazyQuery>;
export type UserComparisonQueryResult = ApolloReactCommon.QueryResult<UserComparisonQuery, UserComparisonQueryVariables>;
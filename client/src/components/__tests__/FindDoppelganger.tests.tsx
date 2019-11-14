import React from 'react';
import { Provider } from 'react-redux';
import { MockedProvider } from '@apollo/react-testing';
import { act, render, wait } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

import { COMPUTE_DOPPELGANGER_QUERY } from '@src/queries/COMPUTE_DOPPELGANGER_QUERY';
import { ComputeDoppelgangerQueryResult } from '@src/generated/graphql';
import store from '@src/redux/store';
import { FindDoppelganger } from '../FindDoppelganger';

const result: Pick<ComputeDoppelgangerQueryResult, 'data'> = {
  data: {
    __typename: 'Query',
    computeDoppelganger: {
      __typename: 'DoppelgangerType',
      doppelgangerInfo: {
        __typename: 'DoppelgangerInfoType',
        score: 1,
      },
      userProfile: {
        __typename: 'UserProfileType',
        id: '90j0dfsaj001j0231',
        user: {
          __typename: 'UserPublicType',
          username: 'foo',
        },
      },
    },
  },
};

const mocks = [
  {
    request: {
      query: COMPUTE_DOPPELGANGER_QUERY,
    },
    result,
  },
];

describe('FindDoppelganger', () => {
  it('should render doppelganger once loaded', async () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <MockedProvider mocks={mocks}>
          <FindDoppelganger />
        </MockedProvider>
      </Provider>,
    );


    await act(async () => {
      await wait(); // wait for response
    });

    expect(getByTestId('doppelganger-score')).toHaveTextContent(
      '100',
    );
    expect(getByTestId('doppelganger-username')).toHaveTextContent(
      'foo',
    );
  });
});

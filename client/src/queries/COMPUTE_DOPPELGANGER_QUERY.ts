import gql from 'graphql-tag';

export const COMPUTE_DOPPELGANGER_QUERY = gql`
  query ComputeDoppelganger($userProfileId: Int) {
    computeDoppelganger(userProfileId: $userProfileId) {
      ...ComputeDoppelgangerResponse
    }
  }
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

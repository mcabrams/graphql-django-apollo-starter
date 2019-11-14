import React from 'react';
import { RouteComponentProps } from '@reach/router';

import { useUsersQuery } from '@src/generated/graphql';

type UserListProps = RouteComponentProps;

export const UserList: React.FC<UserListProps> = () => {
  const { data, error } = useUsersQuery();
  const users = data && data.users;

  return (
    <div>
      {users && users.edges.map(edge => (
        edge && edge.node && (
          <p key={edge.node.username}>{edge.node.username}</p>
        )
      ))}
      {error}
    </div>
  );
};

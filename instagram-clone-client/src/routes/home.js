import React from 'react';
import {graphql} from 'react-apollo';
import gql from 'graphql-tag';
import Toolbar from '../components/Toolbar';

const query = gql`
  {
    allUsers {
      username
    }
  }
`;
const userItem = (user, i) => <li key={i}>{user.username}</li>;

export default graphql(query)(
  ({data: {allUsers=[], loading}}) => [
    <Toolbar />,
    <ul>
      {allUsers.map(userItem)}
    </ul>
  ]
)

import { gql } from '@apollo/client';

export const REGISTER_USER = gql`
  mutation register($username: String!, $password: String!) {
    register(data: { username: $username, password: $password }) {
      id
      createdAt
      username
      role
    }
  }
`;

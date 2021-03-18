import { gql } from '@apollo/client';

export const GET_PAGES = gql`
  query pages {
    pages {
      id
      createdAt
      updatedAt
      title
      slug
      content
    }
  }
`;

export const GET_PAGE = gql`
  query page($slug: String!) {
    findFirstPage(where: { slug: { equals: $slug } }) {
      id
      createdAt
      updatedAt
      title
      slug
      content
    }
  }
`;

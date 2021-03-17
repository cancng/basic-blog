import { gql } from '@apollo/client';

export const GET_CATEGORIES = gql`
  query categories {
    categories(orderBy: { createdAt: desc }) {
      id
      title
      slug
      thumbnail
      posts {
        id
        title
        slug
        createdAt
      }
    }
  }
`;

export const GET_CATEGORY = gql`
  query category($slug: String) {
    findFirstCategory(where: { slug: { equals: $slug } }) {
      id
      createdAt
      updatedAt
      title
      slug
      thumbnail
      posts {
        id
        createdAt
        updatedAt
        title
        slug
        body
        thumbnail
      }
    }
  }
`;

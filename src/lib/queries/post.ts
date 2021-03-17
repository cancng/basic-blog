import { gql } from '@apollo/client';

export const GET_POSTS = gql`
  query posts {
    posts(orderBy: { createdAt: desc }) {
      id
      createdAt
      title
      slug
      thumbnail
      category {
        id
        createdAt
        updatedAt
        title
        slug
        thumbnail
      }
    }
  }
`;

export const GET_POSTS_BY_SLUG = gql`
  query posts($slug: String) {
    posts(
      orderBy: { createdAt: desc }
      where: { category: { is: { slug: { equals: $slug } } } }
    ) {
      id
      createdAt
      title
      slug
      thumbnail
      category {
        title
      }
    }
  }
`;

export const GET_POST = gql`
  query post($slug: String, $take: Int, $skip: Int) {
    findFirstPost(where: { slug: { equals: $slug } }) {
      id
      createdAt
      title
      slug
      body
      thumbnail
      comments(orderBy: { createdAt: desc }, take: $take, skip: $skip) {
        id
        createdAt
        updatedAt
        authorName
        body
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation createComment(
    $id: ID!
    $authorName: String
    $body: String!
    $take: Int
    $skip: Int
  ) {
    createComment(id: $id, data: { body: $body, authorName: $authorName }) {
      id
      createdAt
      updatedAt
      authorName
      body
      post {
        comments(orderBy: { createdAt: desc }, take: $take, skip: $skip) {
          id
          createdAt
          updatedAt
          authorName
          body
        }
      }
    }
  }
`;

export const GET_POST_COMMENTS = gql`
  query getComments($id: String) {
    comments(where: { postId: { equals: $id } }, orderBy: { createdAt: desc }) {
      id
      createdAt
      updatedAt
      authorName
      body
    }
  }
`;

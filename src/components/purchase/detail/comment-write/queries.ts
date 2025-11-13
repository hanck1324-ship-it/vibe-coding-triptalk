import { gql } from "@apollo/client";

// 리뷰 생성 Mutation
export const CREATE_REVIEW = gql`
  mutation CreateReview($input: CreateReviewInput!) {
    createReview(input: $input) {
      id
      rating
      content
      createdAt
      user {
        id
        name
        profileImage
      }
    }
  }
`;

// 리뷰 수정 Mutation
export const UPDATE_REVIEW = gql`
  mutation UpdateReview($id: ID!, $input: UpdateReviewInput!) {
    updateReview(id: $id, input: $input) {
      id
      rating
      content
      updatedAt
    }
  }
`;

// 리뷰 삭제 Mutation
export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id) {
      success
      message
    }
  }
`;



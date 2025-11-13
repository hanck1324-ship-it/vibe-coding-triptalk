import { gql } from "@apollo/client";

// 리뷰 목록 조회 Query
export const GET_REVIEWS = gql`
  query GetReviews(
    $accommodationId: ID!
    $page: Int
    $pageSize: Int
    $sortBy: String
  ) {
    reviews(
      accommodationId: $accommodationId
      page: $page
      pageSize: $pageSize
      sortBy: $sortBy
    ) {
      items {
        id
        rating
        content
        images
        createdAt
        likeCount
        isLiked
        author {
          id
          name
          profileImage
        }
      }
      totalCount
      averageRating
    }
  }
`;

// 리뷰 상세 조회 Query
export const GET_REVIEW_DETAIL = gql`
  query GetReviewDetail($id: ID!) {
    review(id: $id) {
      id
      rating
      content
      images
      createdAt
      updatedAt
      likeCount
      isLiked
      author {
        id
        name
        profileImage
      }
    }
  }
`;

// 리뷰 좋아요 토글 Mutation
export const TOGGLE_REVIEW_LIKE = gql`
  mutation ToggleReviewLike($reviewId: ID!) {
    toggleReviewLike(reviewId: $reviewId) {
      success
      likeCount
      isLiked
    }
  }
`;

// 리뷰 통계 조회 Query
export const GET_REVIEW_STATS = gql`
  query GetReviewStats($accommodationId: ID!) {
    reviewStats(accommodationId: $accommodationId) {
      totalCount
      averageRating
      ratingDistribution {
        rating
        count
      }
    }
  }
`;



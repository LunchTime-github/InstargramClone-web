import gql from "graphql-tag";

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    file
    totalLike
    totalComment
    isLiked
  }
`;

export const COMMENT_FRAGMENT = gql`
  fragment commentFragement on Comment {
    id
    user {
      username
      avatar
    }
    payload
    isMine
    createdAt
  }
`;

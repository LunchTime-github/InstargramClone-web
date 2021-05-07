import React, { useCallback } from "react";
import styled from "styled-components";
import FatText from "../shared/FatText";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($id: Int!) {
    deleteComment(id: $id) {
      ok
    }
  }
`;

const CommentContainer = styled.div`
  margin-bottom: 15px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  color: ${(props) => props.theme.fontColor};
`;
const HashtagLink = styled(Link)`
  cursor: pointer;
  background-color: inherit;
  color: ${(props) => props.theme.accent};
  &:hover {
    text-decoration: underline;
  }
`;

const Comment = ({ id, photoId, author, payload, isMine }) => {
  const deleteCommentUpdate = useCallback(
    (cache, result) => {
      const {
        data: {
          deleteComment: { ok },
        },
      } = result;

      if (ok) {
        cache.evict({ id: `Comment:${id}` });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            totalComment(prev) {
              return prev - 1;
            },
          },
        });
      }
    },
    [id, photoId]
  );
  const [deleteCommentMutation] = useMutation(DELETE_COMMENT_MUTATION, {
    variables: { id },
    update: deleteCommentUpdate,
  });
  const onDelectClick = useCallback(() => {
    deleteCommentMutation();
  }, [deleteCommentMutation]);

  const cleanPayload = payload.split(" ").map((word, index) =>
    /^#[\w]+/.test(word) ? (
      <React.Fragment key={index}>
        <HashtagLink to={`/hashtags/${word}`}>{word}</HashtagLink>{" "}
      </React.Fragment>
    ) : (
      <React.Fragment key={index}>{word} </React.Fragment>
    )
  );
  return (
    <CommentContainer>
      <Link to={`/users/${author}`}>
        <FatText>{author}</FatText>
      </Link>
      <CommentCaption>{cleanPayload}</CommentCaption>
      {isMine ? <button onClick={onDelectClick}>❌</button> : null}
    </CommentContainer>
  );
};

Comment.propTypes = {
  id: PropTypes.number,
  photoId: PropTypes.number,
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
  isMine: PropTypes.bool,
};

export default Comment;

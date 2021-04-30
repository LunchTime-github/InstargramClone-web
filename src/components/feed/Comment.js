import React from "react";
import styled from "styled-components";
import FatText from "../shared/FatText";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

const Comment = ({ author, payload }) => {
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
      <FatText>{author}</FatText>
      <CommentCaption>{cleanPayload}</CommentCaption>
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;

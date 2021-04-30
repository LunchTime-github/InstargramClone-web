import styled from "styled-components";
import FatText from "../shared/FatText";
import PropTypes from "prop-types";

const CommentContainer = styled.div`
  margin-bottom: 15px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  color: ${(props) => props.theme.fontColor};
`;

const Comment = ({ author, payload }) => (
  <CommentContainer>
    <FatText>{author}</FatText>
    <CommentCaption>{payload}</CommentCaption>
  </CommentContainer>
);

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;

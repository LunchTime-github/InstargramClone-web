import styled from "styled-components";
import FatText from "../shared/FatText";
import PropTypes from "prop-types";
import sanitize from "sanitize-html";

const CommentContainer = styled.div`
  margin-bottom: 15px;
`;
const CommentCaption = styled.span`
  margin-left: 10px;
  color: ${(props) => props.theme.fontColor};
  mark {
    cursor: pointer;
    background-color: inherit;
    color: ${(props) => props.theme.accent};
    &:hover {
      text-decoration: underline;
    }
  }
`;

const Comment = ({ author, payload }) => {
  const cleanPayload = sanitize(payload.replace(/#[\w]+/g, "<mark>$&</mark>"), {
    allowedTags: ["mark"],
  });
  return (
    <CommentContainer>
      <FatText>{author}</FatText>
      <CommentCaption
        dangerouslySetInnerHTML={{
          __html: cleanPayload,
        }}
      />
    </CommentContainer>
  );
};

Comment.propTypes = {
  author: PropTypes.string.isRequired,
  payload: PropTypes.string.isRequired,
};

export default Comment;

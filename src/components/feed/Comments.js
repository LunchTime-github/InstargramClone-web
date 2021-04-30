import styled from "styled-components";
import PropTypes from "prop-types";
import Comment from "./Comment";

const CommentContainer = styled.div`
  margin-top: 20px;
`;
const CommentCount = styled.p`
  opacity: 0.7;
  font-size: 12px;
  color: ${(props) => props.theme.fontColor};
`;
const CommentsList = styled.div`
  margin-top: 20px;
`;

const Comments = ({ author, caption, totalComment, comments }) => (
  <CommentContainer>
    <Comment author={author} payload={caption} />
    <CommentCount>{totalComment}개의 댓글이 있습니다.</CommentCount>
    <CommentsList>
      {comments?.map((comment) => (
        <Comment
          key={comment.id}
          author={comment.user.username}
          payload={comment.payload}
        />
      ))}
    </CommentsList>
  </CommentContainer>
);

Comments.propTypes = {
  author: PropTypes.string.isRequired,
  caption: PropTypes.string.isRequired,
  totalComment: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      user: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }),
      payload: PropTypes.string.isRequired,
    })
  ),
};

export default Comments;

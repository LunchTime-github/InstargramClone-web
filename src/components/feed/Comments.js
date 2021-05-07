import styled from "styled-components";
import PropTypes from "prop-types";
import Comment from "./Comment";
import { useForm } from "react-hook-form";
import { useCallback } from "react";
import { InputText } from "../auth/Inputs";
import { gql, useMutation } from "@apollo/client";
import useUser from "../../hooks/useUser";

const CREATE_COMMENT_MUTATION = gql`
  mutation createComment($photoId: Int!, $payload: String!) {
    createComment(photoId: $photoId, payload: $payload) {
      ok
      id
      error
    }
  }
`;

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
const CommentInput = styled.div`
  input {
    margin-top: 20px;
    margin-bottom: 0;
  }
`;

const Comments = ({ photoId, author, caption, totalComment, comments }) => {
  const { data: userData } = useUser();
  const { register, handleSubmit, setValue, getValues } = useForm();
  const createCommentUpdate = useCallback(
    (cache, result) => {
      const {
        data: {
          createComment: { ok, id },
        },
      } = result;

      if (ok && userData?.me) {
        const { payload } = getValues();
        setValue("payload", "");
        const newComment = {
          __typename: "Comment",
          createdAt: Date.now().toString(),
          id,
          isMine: true,
          payload,
          user: { ...userData.me },
        };
        const newCacheComment = cache.writeFragment({
          data: newComment,
          fragment: gql`
            fragment BSName on Comment {
              id
              createdAt
              isMine
              payload
              user {
                username
                avatar
              }
            }
          `,
        });
        cache.modify({
          id: `Photo:${photoId}`,
          fields: {
            comments(prev) {
              return [...prev, newCacheComment];
            },
            totalComment(prev) {
              return prev + 1;
            },
          },
        });
      }
    },
    [getValues, photoId, setValue, userData.me]
  );
  const [createCommentMutation, { loading }] = useMutation(
    CREATE_COMMENT_MUTATION,
    {
      update: createCommentUpdate,
    }
  );
  const onValid = useCallback(
    ({ payload }) => {
      if (loading) return;
      createCommentMutation({ variables: { photoId, payload } });
    },
    [createCommentMutation, loading, photoId]
  );
  return (
    <CommentContainer>
      <Comment author={author} payload={caption} />
      <CommentCount>{totalComment}개의 댓글이 있습니다.</CommentCount>
      <CommentsList>
        {comments?.map((comment) => (
          <Comment
            key={comment.id}
            id={comment.id}
            photoId={photoId}
            author={comment.user.username}
            payload={comment.payload}
            isMine={comment.isMine}
          />
        ))}
        <CommentInput>
          <form onSubmit={handleSubmit(onValid)}>
            <InputText
              type="text"
              name="payload"
              ref={register({ required: true })}
              id=""
              placeholder="댓글을 입력하세요"
            />
          </form>
        </CommentInput>
      </CommentsList>
    </CommentContainer>
  );
};

Comments.propTypes = {
  photoId: PropTypes.number.isRequired,
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

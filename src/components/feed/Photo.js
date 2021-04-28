import PropTypes from "prop-types";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../shared/Avatar";
import FatText from "../shared/FatText";
import { gql, useMutation } from "@apollo/client";

const PhotoContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  margin-bottom: 40px;

  max-width: 615px;

  background-color: ${(props) => props.theme.boxBg};
`;

const PhotoHeader = styled.div`
  display: flex;
  align-items: center;

  padding: 15px;
`;

const Username = styled(FatText)`
  margin-left: 15px;
`;

const PhotoFile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-height: 615px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const PhotoData = styled.div`
  padding: 15px;
`;

const PhotoActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  margin-bottom: 15px;

  div {
    display: flex;
    align-items: center;
  }
`;

const PhotoAction = styled.div`
  cursor: pointer;
  &:not(:last-child) {
    margin-right: 15px;
  }
`;

const PhotoActionIcon = styled(FontAwesomeIcon)`
  font-size: 28px;
  color: ${(props) => (props.$like ? "tomato" : props.theme.fontColor)};
`;

const Likes = styled(FatText)``;

const TOGGLE_LIKE_MUTATION = gql`
  mutation toggleLike($id: Int!) {
    toggleLike(id: $id) {
      ok
      error
    }
  }
`;

const Photo = ({ id, user, file, isMine, isLiked, totalLike }) => {
  const [toggleLikeMutation] = useMutation(TOGGLE_LIKE_MUTATION, {
    variables: {
      id,
    },
  });

  return (
    <PhotoContainer>
      <PhotoHeader>
        <Avatar url={user.avatar} lg />
        <Username>{user.username}</Username>
      </PhotoHeader>
      <PhotoFile>
        <img src={file} alt="" />
      </PhotoFile>
      <PhotoData>
        <PhotoActions>
          <div>
            {!isMine && (
              <PhotoAction onClick={toggleLikeMutation}>
                <PhotoActionIcon
                  icon={isLiked ? solidHeart : faHeart}
                  $like={isLiked}
                />
              </PhotoAction>
            )}
            <PhotoAction>
              <PhotoActionIcon icon={faComment} />
            </PhotoAction>
            <PhotoAction>
              <PhotoActionIcon icon={faPaperPlane} />
            </PhotoAction>
          </div>
          <div>
            <PhotoAction>
              <PhotoActionIcon icon={faBookmark} />
            </PhotoAction>
          </div>
        </PhotoActions>
        <Likes>{totalLike}명이 좋아합니다</Likes>
      </PhotoData>
    </PhotoContainer>
  );
};

Photo.propTypes = {
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    avatar: PropTypes.string,
    username: PropTypes.string.isRequired,
  }).isRequired,
  file: PropTypes.string.isRequired,
  isMine: PropTypes.bool.isRequired,
  isLiked: PropTypes.bool.isRequired,
  totalLike: PropTypes.number.isRequired,
};

export default Photo;

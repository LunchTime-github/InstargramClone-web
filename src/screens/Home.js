import { useQuery, gql } from "@apollo/client";
import {
  faBookmark,
  faComment,
  faHeart,
  faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import Avatar from "../components/shared/Avatar";
import FatText from "../components/shared/FatText";

const FEED_QUERY = gql`
  query seeFeed {
    seeFeed {
      id
      user {
        username
        avatar
      }
      file
      caption
      totalLike
      totalComment
      createdAt
      isMine
    }
  }
`;

const PhotoContainer = styled.div`
  border: 1px solid ${(props) => props.theme.borderColor};
  margin-bottom: 20px;

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
  color: ${(props) => props.theme.fontColor};
`;

const Likes = styled(FatText)``;

const Home = () => {
  const { data } = useQuery(FEED_QUERY);
  console.log(data);
  return (
    <>
      {data?.seeFeed?.map((photo) => (
        <PhotoContainer key={photo.id}>
          <PhotoHeader>
            <Avatar url={photo.user.avatar} lg />
            <Username>{photo.user.username}</Username>
          </PhotoHeader>
          <PhotoFile>
            <img src={photo.file} alt="" />
          </PhotoFile>
          <PhotoData>
            <PhotoActions>
              <div>
                <PhotoAction>
                  <PhotoActionIcon icon={faHeart} />
                </PhotoAction>
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
            <Likes>{photo.totalLike}명이 좋아합니다</Likes>
          </PhotoData>
        </PhotoContainer>
      ))}
    </>
  );
};

export default Home;

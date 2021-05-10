import { gql, useMutation, useQuery } from "@apollo/client";
import { faComment, faHeart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import FatText from "../components/shared/FatText";
import { PHOTO_FRAGMENT } from "../fragments";
import { InputSubmitButton } from "../components/auth/Inputs";
import PageTitle from "../components/shared/PageTitle";
import useUser from "../hooks/useUser";

const FOLLEO_USER_MUTATION = gql`
  mutation followUser($username: String!) {
    followUser(username: $username) {
      ok
    }
  }
`;

const UNFOLLEO_USER_MUTATION = gql`
  mutation unfollowUser($username: String!) {
    unfollowUser(username: $username) {
      ok
    }
  }
`;

const SEE_PROFILE_QUERY = gql`
  query seeProfile($username: String!) {
    seeProfile(username: $username) {
      firstName
      lastName
      username
      bio
      avatar
      photos {
        ...PhotoFragment
      }
      totalFollowing
      totalFollowers
      isMe
      isFollowing
    }
  }
  ${PHOTO_FRAGMENT}
`;

const Header = styled.div`
  display: flex;
`;
const Avatar = styled.img`
  margin-left: 50px;
  height: 160px;
  width: 160px;
  border-radius: 50%;
  margin-right: 150px;
  background-color: ${(props) => props.theme.fontColor};
`;
const Column = styled.div``;
const Username = styled.h3`
  font-size: 28px;
  font-weight: 400;
`;
const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  font-size: 16px;
  color: ${(props) => props.theme.fontColor};
`;
const List = styled.ul`
  display: flex;
`;
const Item = styled.li`
  margin-right: 20px;
`;
const Value = styled(FatText)`
  font-size: 18px;
`;
const Name = styled(FatText)`
  font-size: 20px;
`;

const Grid = styled.div`
  display: grid;
  grid-auto-rows: 290px;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-top: 50px;
`;

const Photo = styled.div`
  background-image: url(${(props) => props.bg});
  background-size: cover;
  position: relative;
`;

const Icons = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const Icon = styled.span`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin: 0px 5px;
  svg {
    font-size: 14px;
    margin-right: 5px;
  }
`;

const ProfileButton = styled(InputSubmitButton).attrs({
  as: "span",
})`
  margin: 0;
  margin-left: 20px;
  width: auto;
`;

const Profile = () => {
  const { username } = useParams();
  const { data: userData } = useUser();
  const { data, loading } = useQuery(SEE_PROFILE_QUERY, {
    variables: {
      username,
    },
  });
  const [followUserMutation] = useMutation(FOLLEO_USER_MUTATION, {
    variables: { username },
    refetchQueries: [
      { query: SEE_PROFILE_QUERY, variables: { username } },
      {
        query: SEE_PROFILE_QUERY,
        variables: { username: userData?.me?.username },
      },
    ],
  });
  const [unfollowUserMutation] = useMutation(UNFOLLEO_USER_MUTATION, {
    variables: { username },
    refetchQueries: [
      { query: SEE_PROFILE_QUERY, variables: { username } },
      {
        query: SEE_PROFILE_QUERY,
        variables: { username: userData?.me?.username },
      },
    ],
  });
  const getButton = useCallback(
    (seeProfile) => {
      const { isMe, isFollowing } = seeProfile;
      if (isMe) {
        return <ProfileButton>Edit Profile</ProfileButton>;
      }
      if (isFollowing) {
        return (
          <ProfileButton onClick={unfollowUserMutation}>UnFollow</ProfileButton>
        );
      } else {
        return (
          <ProfileButton onClick={followUserMutation}>Follow</ProfileButton>
        );
      }
    },
    [followUserMutation, unfollowUserMutation]
  );
  return (
    <div>
      <PageTitle
        title={
          loading ? "Loading..." : `${data?.seeProfile?.username}'s Profile`
        }
      />
      <Header>
        <Avatar src={data?.seeProfile?.avatar} />
        <Column>
          <Row>
            <Username>{data?.seeProfile?.username}</Username>
            {data?.seeProfile ? getButton(data.seeProfile) : null}
          </Row>
          <Row>
            <List>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowers}</Value> followers
                </span>
              </Item>
              <Item>
                <span>
                  <Value>{data?.seeProfile?.totalFollowing}</Value> following
                </span>
              </Item>
            </List>
          </Row>
          <Row>
            <Name>
              {data?.seeProfile?.firstName}
              {"  "}
              {data?.seeProfile?.lastName}
            </Name>
          </Row>
          <Row>{data?.seeProfile?.bio}</Row>
        </Column>
      </Header>
      <Grid>
        {data?.seeProfile?.photos.map((photo) => (
          <Photo key={photo.id} bg={photo.file}>
            <Icons>
              <Icon>
                <FontAwesomeIcon icon={faHeart} />
                {photo.totalLike}
              </Icon>
              <Icon>
                <FontAwesomeIcon icon={faComment} />
                {photo.totalComment}
              </Icon>
            </Icons>
          </Photo>
        ))}
      </Grid>
    </div>
  );
};

export default Profile;

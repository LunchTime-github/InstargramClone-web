import styled from "styled-components";

const SAvatar = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.fontColor};
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;

const Avatar = ({ url = "" }) => {
  return <SAvatar url={url}></SAvatar>;
};

export default Avatar;

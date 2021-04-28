import styled from "styled-components";

const SAvatar = styled.div`
  width: ${(props) => (props.lg ? "30px" : "24px")};
  height: ${(props) => (props.lg ? "30px" : "24px")};
  border-radius: 50%;
  background-color: ${(props) => props.theme.fontColor};
  background-image: url(${(props) => props.url});
  background-size: cover;
  background-position: center;
`;

const Avatar = ({ url = "", lg }) => {
  return <SAvatar url={url} lg={lg}></SAvatar>;
};

export default Avatar;

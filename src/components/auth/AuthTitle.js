import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Title = styled.h1`
  margin: 40px 0;
`;

const AuthTitle = () => (
  <Title>
    <FontAwesomeIcon
      icon={faInstagram}
      size={"5x"}
      color={(props) => props.theme.fontColor}
    />
  </Title>
);

export default AuthTitle;

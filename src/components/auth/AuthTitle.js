import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

const Title = styled.h1`
  margin: 40px 0;
`;

const FontIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.fontColor};
`;

const AuthTitle = () => {
  return (
    <Title>
      <FontIcon icon={faInstagram} size={"5x"} />
    </Title>
  );
};

export default AuthTitle;

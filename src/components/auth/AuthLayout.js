import { useReactiveVar } from "@apollo/client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

const Container = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 360px;
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 30px;
  right: 30px;
`;

const DarkModeBtn = styled.span`
  cursor: pointer;

  display: inline-block;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 50%;
  padding: 20px;

  background-color: ${(props) => props.theme.boxBg};
`;

const FontIcon = styled(FontAwesomeIcon)`
  color: ${(props) => props.theme.fontColor};
`;

const AuthLayout = ({ children }) => {
  const darkMode = useReactiveVar(darkModeVar);
  return (
    <Container>
      <Wrapper>{children}</Wrapper>
      <Footer>
        <DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}>
          <FontIcon icon={darkMode ? faSun : faMoon} size="2x" />
        </DarkModeBtn>
      </Footer>
    </Container>
  );
};

export default AuthLayout;

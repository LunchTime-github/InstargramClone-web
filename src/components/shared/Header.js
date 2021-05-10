import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { faCompass, faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { useReactiveVar } from "@apollo/client";
import {
  darkModeVar,
  disableDarkMode,
  enableDarkMode,
  isLoggedInVar,
} from "../../apollo";
import { Link } from "react-router-dom";
import routes from "../../routes";
import useUser from "../../hooks/useUser";
import Avatar from "./Avatar";

const SHeader = styled.div`
  /* position: fixed;
  top: 0;
  z-index: 1280;
  width: 100%; */

  border-bottom: 1px solid ${(props) => props.theme.borderColor};
  padding: 5px 0;

  background-color: ${(props) => props.theme.boxBg};

  display: flex;
  align-items: center;
  justify-content: center;
`;

const SWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  box-sizing: border-box;

  max-width: 930px;
  width: 100%;
  padding: 0 10px;
`;

const SColumn = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.span`
  cursor: pointer;
  display: inline-block;
  box-sizing: border-box;

  margin: 10px;

  font-size: ${(props) => (props.size === "lg" ? "32px" : "20px")};
`;

const FontIcon = styled(FontAwesomeIcon)`
  font-size: inherit;
  color: ${(props) => props.theme.fontColor};
`;

const Button = styled.span`
  background-color: ${(props) => props.theme.accent};
  border-radius: 5px;
  padding: 6px 14px;
  color: white;
  font-size: 12px;
`;

const Header = () => {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  const darkMode = useReactiveVar(darkModeVar);
  const { data } = useUser();

  return (
    <SHeader>
      <SWrap>
        <SColumn>
          <IconButton size="lg">
            <Link to={`/`}>
              <FontIcon icon={faInstagram} />
            </Link>
          </IconButton>
        </SColumn>
        <SColumn>
          <IconButton onClick={darkMode ? disableDarkMode : enableDarkMode}>
            <FontIcon icon={darkMode ? faSun : faMoon} />
          </IconButton>
          {isLoggedIn ? (
            <>
              <IconButton>
                <Link to={`/`}>
                  <FontIcon icon={faHome} />
                </Link>
              </IconButton>
              <IconButton>
                <FontIcon icon={faCompass} />
              </IconButton>
              <IconButton>
                <Link to={`/users/${data?.me?.username}`}>
                  <Avatar url={data?.me?.avatar} />
                </Link>
              </IconButton>
            </>
          ) : (
            <Link href={routes.home}>
              <Button>로그인</Button>
            </Link>
          )}
        </SColumn>
      </SWrap>
    </SHeader>
  );
};

export default Header;

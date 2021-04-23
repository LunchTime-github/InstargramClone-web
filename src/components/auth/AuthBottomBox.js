import { Link } from "react-router-dom";
import styled from "styled-components";
import WhiteBox from "../shared/WhiteBox";

const SignUpButton = styled(Link)`
  cursor: pointer;
  font-weight: 700;
  color: ${(props) => props.theme.accent};
`;

const AuthBottomBox = ({ cta, path, linkText }) => {
  return (
    <WhiteBox>
      <span>{cta}</span> <SignUpButton to={path}>{linkText}</SignUpButton>
    </WhiteBox>
  );
};

export default AuthBottomBox;

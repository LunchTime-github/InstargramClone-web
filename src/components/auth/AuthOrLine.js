import styled from "styled-components";

const SOrLine = styled.div`
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 20px;
    width: 100%;
    border-top: 1px solid ${(props) => props.theme.borderColor};
    z-index: 1;
  }

  span {
    position: relative;
    display: inline-block;
    padding: 8px 16px;
    background-color: ${(props) => props.theme.boxBg};
    z-index: 10;
  }
`;

const AuthOrLine = () => (
  <SOrLine>
    <span>또는</span>
  </SOrLine>
);

export default AuthOrLine;

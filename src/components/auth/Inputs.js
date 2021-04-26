import styled, { css } from "styled-components";

const inputCss = css`
  box-sizing: border-box;
  display: block;
  width: 100%;
  outline: none;

  font-size: 12px;
  line-height: 16px;
`;

const InputStyle = styled.input`
  ${inputCss}
`;

export const InputText = styled(InputStyle)`
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.textInputColor};
  color: ${(props) => props.theme.fontColor};

  &:focus {
    background-color: ${(props) => props.theme.boxBg};
    border-color: ${(props) => props.theme.borderFocusColor};
  }
`;

const buttonCss = css`
  cursor: pointer;

  margin: 15px 0;
  border: 0;
  border-radius: 5px;
  padding: 8px;
  background-color: ${(props) => props.theme.accent};

  color: white;
  font-weight: 700;
`;

export const InputSubmitButton = styled(InputStyle)`
  ${buttonCss}
`;

export const FacebookLogin = styled.a`
  cursor: pointer;

  display: flex;
  justify-content: center;
  align-items: center;
  color: #385185;

  span {
    margin-left: 6px;
  }
`;

const SInputButton = styled(FacebookLogin)`
  ${inputCss}
  ${buttonCss}
`;

export const InputButton = ({ children }) => (
  <SInputButton>{children}</SInputButton>
);

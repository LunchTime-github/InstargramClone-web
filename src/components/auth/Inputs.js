import styled from "styled-components";

const InputStyle = styled.input`
  box-sizing: border-box;
  display: block;
  width: 100%;
  outline: none;

  font-size: 12px;
  line-height: 16px;
`;

const SInputText = styled(InputStyle)`
  margin: 10px 0;
  border: 1px solid ${(props) => props.theme.borderColor};
  border-radius: 5px;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.boxBg};
  color: ${(props) => props.theme.fontColor};

  &:focus {
    border-color: ${(props) => props.theme.borderFocusColor};
  }
`;

const SInputButton = styled(InputStyle)`
  cursor: pointer;

  margin: 15px 0;
  border: 0;
  border-radius: 5px;
  padding: 8px;
  background-color: ${(props) => props.theme.accent};

  color: white;
  font-weight: 700;
`;

export const InputText = (props) => <SInputText {...props} />;

export const InputSubmitButton = (props) => <SInputButton {...props} />;

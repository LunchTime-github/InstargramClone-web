import styled from "styled-components";

const WhiteBox = styled.div`
  padding: 20px 40px;
  margin: 10px 20px;
  background-color: ${(props) => props.theme.boxBg};
  border: 1px solid ${(props) => props.theme.borderColor};
  text-align: center;

  font-size: 12px;
  line-height: 24px;
  color: ${(props) => props.theme.fontColor};
`;

export default WhiteBox;

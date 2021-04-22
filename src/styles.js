import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  fontColor: "#2c2c2c",
  bgColor: "#fafafa",
};

export const darkTheme = {
  fontColor: "white",
  bgColor: "#333333",
};

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;

export default GlobalStyles;

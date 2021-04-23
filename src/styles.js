import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

export const lightTheme = {
  accent: "rgba(0, 149, 246)",
  borderColor: "#dbdbdb",
  borderFocusColor: "#666666",
  bgColor: "#fafafa",
  boxBg: "white",
  fontColor: "#2c2c2c",
};

export const darkTheme = {
  accent: "rgba(0, 149, 246)",
  borderColor: "#dbdbdb",
  borderFocusColor: "#aaaaaa",
  bgColor: "#333333",
  boxBg: "#444444",
  fontColor: "white",
};

const GlobalStyles = createGlobalStyle`
    ${reset}
    body {
        background-color: ${(props) => props.theme.bgColor};
    }
`;

export default GlobalStyles;

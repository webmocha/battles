import { createGlobalStyle } from "./styled-components";
import theme from "./theme";
import fonts from "./fonts";

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 16px;
    overflow-x: hidden;
    background: #161719;
    background: ${theme.colors.darkBackground};
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${theme.colors.text};
    font-family: ${theme.fonts.base};
    font-weight: 300;
    letter-spacing: 0.1px;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  ${fonts}
`;

export default GlobalStyles;

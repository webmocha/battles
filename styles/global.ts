import { createGlobalStyle } from "./styled-components";
import { colors, fonts } from "./theme";

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 16px;
    overflow-x: hidden;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    color: ${colors.darkText};
    font-family: ${fonts.base};
    font-weight: 300;
    letter-spacing: 0.1px;
    overflow-x: hidden;
  }
`;

export default GlobalStyles;

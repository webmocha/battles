import { createGlobalStyle } from "./styled-components";
import { media } from "./utils/breakpoint";
import theme from "./theme";

const GlobalStyles = createGlobalStyle`
  :root {
    font-size: 12px;
    overflow-x: hidden;
    background: ${theme.colors.darkBackground};

    ${media.small`
      font-size: 14px;
    `}
    ${media.large`
      font-size: 16px;
    `}
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    height: 100vh;
    color: ${theme.colors.text};
    font-family: ${theme.fonts.base};
    font-weight: 300;
    letter-spacing: 0.1px;
    overflow-x: hidden;
    padding-bottom: 3rem;
    background: ${theme.colors.darkBackground};
  }

  h1, h2, h3, h4, h5, h6 {
    font-weight: normal;
  }

  p {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }

  strong {
    color: ${theme.colors.liteText};
  }

  a {
    font-weight: 600;
    color: ${theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  blockquote {
    border-left: 0.3rem solid #454545;
    padding: 0.5rem 1rem;
    color: #717171;
    background: #151515;
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: 1.5rem;

    p {
      margin-bottom: 0;
    }
  }

  code {
    background-color: #151515;
    color: #bbb;
    border-radius: 3px;
    padding: 0 5px;
    font-size: 1.3rem;
  }

  hr {
    margin-top: 4rem;
    margin-bottom: 4rem;
    border: 0;
    border-top: 1px solid ${theme.colors.primary};
  }
`;

export default GlobalStyles;

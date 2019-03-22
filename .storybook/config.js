import React from "react";
import { configure, addDecorator, addParameters } from "@storybook/react";
import { themes } from "@storybook/theming";
import { withKnobs } from "@storybook/addon-knobs";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import GlobalStyles from "../styles/global";
import theme from "../styles/theme";

const StorybookGlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700');

  body {
    height: 100vh;
    padding: 0.5rem;
  }
`;

// automatically import all files ending in *.stories.tsx
const req = require.context("../components", true, /.stories.tsx$/);

function loadStories() {
  req.keys().forEach(req);
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    <React.Fragment>
      <GlobalStyles />
      <StorybookGlobalStyles />
      {story()}
    </React.Fragment>
  </ThemeProvider>
));

addDecorator(withKnobs);

addParameters({
  options: {
    brandTitle: "Battles.dev",
    enableShortcuts: false,
    hierarchyRootSeparator: /\|/,
    hierarchySeparator: /\//,
    theme: themes.dark,
  },
});

configure(loadStories, module);

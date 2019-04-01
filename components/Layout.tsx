import * as React from "react";
import Head from "next/head";
import { ThemeProvider } from "../styles/styled-components";
import GlobalStyles from "../styles/global";
import theme from "../styles/theme";
import Footer from "./Footer";

export interface Props {
  title?: string;
}

const Layout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children, title = "Battles.dev" } = props;

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <GlobalStyles />
        <Head>
          <title>{title}</title>
        </Head>
        {children}
        <Footer />
      </React.Fragment>
    </ThemeProvider>
  );
};

export default Layout;

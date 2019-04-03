import * as React from "react";
import App, { Container } from "next/app";
import BracketStore from "../components/Bracket/Store";

class MyApp extends App {
  public render(): JSX.Element {
    const { Component, pageProps } = this.props;
    return (
      <Container>
        <BracketStore>
          <Component {...pageProps} />
        </BracketStore>
      </Container>
    );
  }
}

export default MyApp;

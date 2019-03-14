import * as React from "react";
import Head from "next/head";

export interface Props {
  title?: string;
}

const Layout: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { children, title = "Battles.dev" } = props;

  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  );
};

export default Layout;

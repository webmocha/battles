import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";
import { getFightData } from "../api/fights";

const Title = styled.h1`
  font-size: 7.5rem;
  font-family: ${(props) => props.theme.fonts.title};
`;

const Fight: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout title="Fight | Battles.dev">
      <Title>Fight! 💥</Title>
      <p>
        <Link href="/">
          <a>Back</a>
        </Link>
      </p>
    </Layout>
  );
};

Fight.getInitialProps = async ({ req, res }) =>
  !req ? await getFightData() : res.data;

export default Fight;

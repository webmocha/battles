import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Bracket } from "../components/Bracket";
import Layout from "../components/Layout";
import { getFightData } from "../api/fights";

const Title = styled.h1`
  font-size: 7.5rem;
  font-family: ${(props) => props.theme.fonts.title};
`;

const matchup = [[["A", "B"], ["C", "D"]], [["A", "C"]], [["C"]]];

const Fight = (): JSX.Element => {
  return (
    <Layout title="Fight | Battles.dev">
      <Title>Fight! 💥</Title>
      <Bracket matchup={matchup} />
      <p>
        <Link href="/">
          <a>Back</a>
        </Link>
      </p>
    </Layout>
  );
};

Fight.getInitialProps = async ({ req, res, query }: any) => {
  if (!req) {
    const { packages } = query;
    const response = await getFightData(packages);
    const data = await response.json();
    return data;
  } else {
    return res.data;
  }
};

export default Fight;

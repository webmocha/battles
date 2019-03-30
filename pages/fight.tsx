import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import { Bracket } from "../components/Bracket";
import Layout from "../components/Layout";

const Title = styled.h1`
  font-size: 7.5rem;
  font-family: ${(props) => props.theme.fonts.title};
`;

const matchup = [[["A", "B"], ["C", "D"]], [["A", "C"]], [["C"]]];

const Fight: React.FunctionComponent = (): JSX.Element => {
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

export default Fight;

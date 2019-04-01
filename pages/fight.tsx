import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import percentChange from "../utils/percentChange";
import generateMatchUp from "../utils/generateMatchUp";
import { Bracket } from "../components/Bracket";
import Layout from "../components/Layout";
import { getFightData, DownloadsResponse } from "../api/fight";

const Title = styled.h1`
  font-size: 7.5rem;
  font-family: ${(props) => props.theme.fonts.title};
`;

const processDataOutcome = (data: DownloadsResponse): any => {
  return Object.keys(data).reduce((acc, key) => {
    const d = data[key];
    const outcome = percentChange(
      d.downloads[0].downloads,
      d.downloads[1].downloads,
    );
    return { ...acc, [key]: { ...d, outcome } };
  }, {});
};

const checkBadPackage = (data: DownloadsResponse): string[] =>
  Object.keys(data).filter((key) => {
    return !data[key];
  });

const Fight = (props: any): JSX.Element => {
  const { payload } = props;
  const [packages, setPackages] = React.useState({});
  const [matchup, setMatchup] = React.useState([] as string[][][]);
  const badPackages = checkBadPackage(payload);
  const hasBadPackages = badPackages.length > 0;

  React.useEffect(() => {
    if (!hasBadPackages) {
      setPackages(processDataOutcome(payload));
    }
  }, []);

  React.useEffect(() => {
    setMatchup(generateMatchUp(packages));
  }, [packages]);

  return (
    <Layout title="Fight | Battles.dev">
      <Title>Fight! 💥</Title>
      {hasBadPackages && (
        <p>Invalid packages: {`"${badPackages.join(", ")}"`}</p>
      )}
      {matchup.length > 0 && <Bracket matchup={matchup} />}
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
    const payload = await getFightData(query.packages);
    return { payload };
  } else {
    return { payload: res.data };
  }
};

export default Fight;

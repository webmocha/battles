import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import percentChange from "../utils/percentChange";
import { Bracket } from "../components/Bracket";
import Layout from "../components/Layout";
import { getFightData, DownloadsResponse } from "../api/fight";

const Title = styled.h1`
  font-size: 7.5rem;
  font-family: ${(props) => props.theme.fonts.title};
`;

const matchup = [[["A", "B"], ["C", "D"]], [["A", "C"]], [["C"]]];

const processDataOutcome = (data: DownloadsResponse): any => {
  return Object.keys(data).map((key) => {
    const d = data[key];
    const outcome = percentChange(
      d.downloads[0].downloads,
      d.downloads[1].downloads,
    );
    return { ...d, outcome };
  });
};

const checkBadPackage = (data: DownloadsResponse): string[] =>
  Object.keys(data).filter((key) => {
    return !data[key];
  });

const Fight = (props: any): JSX.Element => {
  const { payload } = props;
  const parsedPayload =
    typeof payload === "string" ? JSON.parse(payload) : payload;
  const [packages, setPackages] = React.useState({});
  const badPackages = checkBadPackage(parsedPayload);
  const hasBadPackages = badPackages.length > 0;

  React.useEffect(() => {
    if (!hasBadPackages) {
      setPackages(processDataOutcome(parsedPayload));
    }
  }, []);

  console.log("packages", packages);

  return (
    <Layout title="Fight | Battles.dev">
      <Title>Fight! 💥</Title>
      {hasBadPackages && (
        <p>Invalid packages: {`"${badPackages.join(", ")}"`}</p>
      )}
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
    return { payload: data };
  } else {
    return res.data;
  }
};

export default Fight;

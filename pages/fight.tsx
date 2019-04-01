import * as React from "react";
import Link from "next/link";
import styled from "../styles/styled-components";
import { media } from "../styles/utils/breakpoint";
import percentChange from "../utils/percentChange";
import generateMatchUp from "../utils/generateMatchUp";
import { Bracket } from "../components/Bracket";
import { Button } from "../components/Button";
import Layout from "../components/Layout";
import { getFightData, DownloadsResponse } from "../api/fight";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 7.5rem;
  line-height: 1;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};

  ${media.small`
    margin-top: 7rem;
  `}
`;

const StyledSVGWrapper = styled.div`
  text-align: center;
  overflow: scroll;
  padding: 2rem;
  margin-top: 2rem;

  ${media.small`
    margin-top: 5rem;
  `}
`;

const BackButton = styled(Button)`
  display: block;
  margin: 5rem auto;
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
      <StyledSVGWrapper>
        {matchup.length > 0 && <Bracket matchup={matchup} animate={true} />}
      </StyledSVGWrapper>

      <Link href="/">
        <BackButton ripple={true}>Back</BackButton>
      </Link>
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

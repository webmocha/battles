import * as React from "react";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import styled from "../styles/styled-components";
import { media } from "../styles/utils/breakpoint";
import percentChange from "../utils/percentChange";
import generateMatchUp from "../utils/generateMatchUp";
import { Bracket } from "../components/Bracket";
import { Button } from "../components/Button";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Container from "../components/Container";
import Title from "../components/Title";
import { getFightData, DownloadsResponse } from "../api/fight";

const StyledSVGWrapper = styled(animated.div)`
  text-align: center;
  overflow: auto;
  padding: 2rem;
  margin-top: 2rem;
  background: ${(props) => props.theme.colors.darkBackground};

  ${media.small`
    margin-top: 5rem;
  `}
`;

const Warning = styled.div`
  margin-top: 5rem;
  font-size: 1.5rem;
  text-align: center;
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
    return !data[key] || data[key].error;
  });

const Fight = (props: any): JSX.Element => {
  const { payload = {} } = props;
  const [packages, setPackages] = React.useState({});
  const [matchup, setMatchup] = React.useState([] as string[][][]);
  const noPackages = Object.keys(payload).length === 0;
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

  const bracketSpring = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 1800,
  });

  return (
    <Layout title="Fight | Battles.dev">
      <Nav />
      <Container>
        <Title>Fight! 💥</Title>
        {hasBadPackages && (
          <Warning>
            <p>
              Oops! There{`'`}s an invalid package, make sure your spelling is
              correct.
            </p>
          </Warning>
        )}
        {noPackages && (
          <Warning>
            <p>No contenders! Go back and add some packages!</p>
          </Warning>
        )}
        <StyledSVGWrapper style={bracketSpring}>
          {matchup.length > 0 && <Bracket matchup={matchup} animate={true} />}
        </StyledSVGWrapper>

        <animated.div style={bracketSpring}>
          <Link href="/">
            <BackButton ripple={true}>Back</BackButton>
          </Link>
        </animated.div>
      </Container>
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

import * as React from "react";
import Link from "next/link";
import { useSpring, animated } from "react-spring";
import styled from "../styles/styled-components";
import { media } from "../styles/utils/breakpoint";
import percentChange from "../utils/percentChange";
import generateMatchUp from "../utils/generateMatchUp";
import { BracketStoreContext } from "../components/Bracket/Store";
import Details from "../components/Bracket/Details";
import Loader from "../components/Loader";
import { Bracket } from "../components/Bracket";
import { Button } from "../components/Button";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Container from "../components/Container";
import Title from "../components/Title";
import { getFightData, DownloadsResponse } from "../api/fight";

const StyledSVGWrapper = styled(animated.div)`
  position: relative;
  text-align: center;
  overflow: auto;
  padding: 2rem;
  margin-top: 2rem;

  ${media.small`
    margin-top: 5rem;
    overflow: visible;
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

export const availableContenderCount = [2, 3, 4, 6, 8];

const processDataOutcome = (data: DownloadsResponse): any => {
  return Object.keys(data).reduce((acc, key) => {
    const d = data[key];
    const outcome = percentChange(
      d.downloads[0].downloads,
      d.downloads[1].downloads,
    );
    return { ...acc, [key]: { ...d, outcome: outcome || 0 } };
  }, {});
};

const checkBadPackage = (data: DownloadsResponse): string[] =>
  Object.keys(data).filter((key) => {
    return !data[key] || data[key].error;
  });

const Fight = (props: any): JSX.Element => {
  const { payload = {} } = props;
  const {
    state: { packages, details },
    dispatch,
  } = React.useContext(BracketStoreContext);
  const [matchup, setMatchup] = React.useState([] as string[][][]);
  const payloadKeys = Object.keys(payload);
  const packagesCount = payloadKeys.length;
  const noPackages = packagesCount === 0 || payloadKeys.includes("undefined");
  const badPackages = checkBadPackage(payload);
  const hasBadPackages = badPackages.length > 0;
  const invalidContenderCount = !availableContenderCount.includes(
    packagesCount,
  );
  const hasWarning = hasBadPackages || noPackages || invalidContenderCount;

  React.useEffect(() => {
    if (!hasBadPackages) {
      dispatch({ type: "SET_PACKAGES", packages: processDataOutcome(payload) });
    }
  }, [payload]);

  React.useEffect(() => {
    if (packages) {
      setMatchup(generateMatchUp(packages));
    }
  }, [packages]);

  const fadeInBracket = useSpring({
    to: { opacity: 1 },
    from: { opacity: 0 },
    delay: 2200,
  });

  const fadeOutLoader = useSpring({
    to: { opacity: 0 },
    from: { opacity: 1 },
    delay: 1600,
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
        {noPackages && !hasBadPackages && (
          <Warning>
            <p>No contenders! Go back and add some packages!</p>
          </Warning>
        )}
        {invalidContenderCount && (
          <Warning>
            <p>Sorry we currently only support 2, 3, 4, 6, or 8 contenders.</p>
          </Warning>
        )}
        {!hasWarning && (
          <StyledSVGWrapper>
            <animated.div style={fadeOutLoader}>
              <Loader
                style={{
                  position: "absolute",
                  top: "5rem",
                  left: 0,
                  right: 0,
                  margin: "0 auto",
                }}
              />
            </animated.div>
            <animated.div
              style={{
                ...fadeInBracket,
                background: "#1E1F20",
                position: "relative",
                zIndex: 10,
              }}
            >
              {matchup.length > 0 && (
                <Bracket matchup={matchup} animate={true} />
              )}
            </animated.div>
          </StyledSVGWrapper>
        )}

        {details && <Details />}

        <animated.div style={fadeInBracket}>
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

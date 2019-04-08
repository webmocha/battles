import * as React from "react";
import debounce from "lodash/debounce";
import LinkAs from "../components/link-as";
import styled from "../styles/styled-components";
import { media } from "../styles/utils/breakpoint";
import { BracketStoreContext } from "../components/Bracket/Store";
import Layout from "../components/Layout";
import { Button, ButtonIcon } from "../components/Button";
import Nav from "../components/Nav";
import Container from "../components/Container";
import AddIcon from "../components/icons/Add";
import SearchInput from "../components/SearchInput";
import { availableContenderCount } from "./fight";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 6.5rem;
  line-height: 1;
  text-align: center;
  color: ${(props) => props.theme.colors.darkText};

  em {
    font-size: 12rem;
    color: ${(props) => props.theme.colors.primary};
  }

  ${media.small`
    font-size: 7.5rem;
    margin-top: 5rem;
    em {
      font-size: 14rem;
    }
  `}
`;

const Blurb = styled.p`
  margin-top: 2.5rem;
  margin-bottom: 5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.liteText};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 2rem;
`;

const FightButton = styled(Button)`
  display: block;
  margin: 5rem auto 10rem;
`;

const Versus = styled.span`
  margin-left: 1rem;
  margin-right: 1rem;
  font-size: 1.5rem;
  font-family: ${(props) => props.theme.fonts.title};
  color: ${(props) => props.theme.colors.red};
  letter-spacing: 2px;
`;

const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  flex-wrap: wrap;

  ${media.small`
    flex-direction: row;
  `}
`;

const StyledButtonIcon = styled(ButtonIcon)`
  margin-top: 1rem;
  margin-left: 1.25rem;

  ${media.small`
    margin-top: 0;
  `}
`;

const RemoveIcon = styled(AddIcon)`
  transform: rotate(45deg);
  path {
    stroke: ${(props) => props.theme.colors.red};
  }
`;

const Cards = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 5rem;
  margin-bottom: 10rem;
`;

const Card = styled(Button)`
  display: block;
  width: 100%;
  height: 10rem;
  margin-bottom: 1rem;

  ${media.medium`
    max-width: 15rem;
  `}

  span {
    display: block;
    font-weight: normal;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    color: #8a8a8a;
  }
`;

const Index: React.FunctionComponent = (): JSX.Element => {
  const [packages, setPackages] = React.useState([] as string[]);
  const [inputCount, setInputCount] = React.useState(2);
  const { dispatch } = React.useContext(BracketStoreContext);
  const countIndex = availableContenderCount.indexOf(inputCount);

  const addPackages = debounce((nodePackage: string, index: number): void => {
    const newPackages = [...packages];
    newPackages[index] = nodePackage;
    setPackages(newPackages);
  }, 200);

  const uniquePackages = [...new Set(packages)];
  const scrubPackages = uniquePackages.filter(Boolean).map((p) =>
    p
      .split(",")[0]
      .trim()
      .split(/[\s]+/)
      .join("-"),
  );

  const disableFight =
    scrubPackages.length < availableContenderCount[countIndex];

  React.useEffect(() => {
    dispatch({ type: "RESET_BRACKET" });
  }, []);

  return (
    <Layout title="Home | Battles.dev">
      <Nav />
      <Container>
        <Title>
          <em>Dev</em>
          <span>Battles</span>
        </Title>
        <Blurb>Find out who will win today.</Blurb>

        <Form>
          {Array.from(Array(inputCount)).map((_, index) => (
            <React.Fragment key={index}>
              <SearchInput index={index} addPackages={addPackages} />
              {index < inputCount - 1 && <Versus>vs</Versus>}
            </React.Fragment>
          ))}

          <div>
            {inputCount < 8 && (
              <StyledButtonIcon
                variant="secondary"
                ripple={true}
                onClick={() =>
                  setInputCount(availableContenderCount[countIndex + 1])
                }
              >
                <AddIcon width={52} stroke="#FFBB00" />
              </StyledButtonIcon>
            )}
            {inputCount > 2 && (
              <StyledButtonIcon
                variant="secondary"
                ripple={true}
                color="red"
                onClick={() => {
                  const newInputCount = availableContenderCount[countIndex - 1];
                  setInputCount(newInputCount);
                  setPackages(packages.slice(0, newInputCount));
                }}
              >
                <RemoveIcon width={52} />
              </StyledButtonIcon>
            )}
          </div>
        </Form>

        <LinkAs route="./fight/:packages" packages={scrubPackages.join(",")}>
          <FightButton
            variant="primary"
            size="large"
            ripple={true}
            disabled={disableFight}
          >
            Fight!
          </FightButton>
        </LinkAs>
        <hr />
      </Container>
      <Container>
        <Title as="h2" style={{ marginTop: 0 }}>
          Presets
        </Title>
        <Cards>
          <LinkAs route="./fight/:packages" packages="react,vue,@angular/cli">
            <Card variant="secondary" ripple={true}>
              Front-end Frameworks
              <span>react, vue, @angular/cli</span>
            </Card>
          </LinkAs>
          <LinkAs route="./fight/:packages" packages="express,hapi,koa,fastify">
            <Card variant="secondary" ripple={true}>
              Node Servers
              <span>express, hapi, koa, fastify</span>
            </Card>
          </LinkAs>
          <LinkAs
            route="./fight/:packages"
            packages="styled-components,jss,fela,emotion,styled-jsx,glamor"
          >
            <Card variant="secondary" ripple={true}>
              CSS-in-JS
              <span>
                styled-components, jss, fela, emotion, styled-jsx, glamor
              </span>
            </Card>
          </LinkAs>
        </Cards>
      </Container>
    </Layout>
  );
};

export default Index;

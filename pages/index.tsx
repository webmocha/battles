import * as React from "react";
import LinkAs from "../components/link-as";
import styled from "../styles/styled-components";
import { media } from "../styles/utils/breakpoint";
import Layout from "../components/Layout";
import { Button, ButtonIcon } from "../components/Button";
import AddIcon from "../components/icons/Add";
import SearchInput from "../components/SearchInput";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin-top: 1rem;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 7.5rem;
  line-height: 1;
  text-align: center;

  ${media.small`
    margin-top: 5rem;
  `}

  em {
    font-size: 14rem;
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Blurb = styled.p`
  margin-top: 2.5rem;
  margin-bottom: 5rem;
  text-align: center;
  color: ${(props) => props.theme.colors.liteText};
  font-family: ${(props) => props.theme.fonts.mono};
  font-size: 2rem;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
  padding: 20px;
`;

const FightButton = styled(Button)`
  display: block;
  margin: 5rem auto;
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
  margin-left: 0;

  ${media.small`
    margin-left: 1.25rem;
    margin-top: 0;
  `}
`;

const Index: React.FunctionComponent = (): JSX.Element => {
  const [packages, setPackages] = React.useState([] as string[]);
  const [inputCount, setInputCount] = React.useState(2);
  const addPackages = (nodePackage: string, index: number): void => {
    const newPackages = [...packages];
    newPackages[index] = nodePackage;
    setPackages(newPackages);
  };
  return (
    <Layout title="Home | Battles.dev">
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

          <StyledButtonIcon
            variant="secondary"
            ripple={true}
            onClick={() =>
              inputCount < 8 ? setInputCount(inputCount + 1) : {}
            }
          >
            <AddIcon width={52} stroke="#FFBB00" />
          </StyledButtonIcon>
        </Form>

        <LinkAs route="./fight/:packages" packages={packages.join(",")}>
          <FightButton variant="primary" size="large" ripple={true}>
            Fight!
          </FightButton>
        </LinkAs>
      </Container>
    </Layout>
  );
};

export default Index;

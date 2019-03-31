import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";
import { Button, ButtonIcon } from "../components/Button";
import AddIcon from "../components/icons/Add";
import SearchInput from "../components/SearchInput";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin-top: 5rem;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 7.5rem;
  line-height: 1;
  text-align: center;

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
`;

const Index: React.FunctionComponent = (): JSX.Element => {
  const [packages, setPackages] = React.useState([] as string[]);
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
          <SearchInput index={0} addPackages={addPackages} />
          <Versus>vs</Versus>
          <SearchInput index={1} addPackages={addPackages} />
          <ButtonIcon
            variant="secondary"
            style={{ marginLeft: "1.25rem" }}
            ripple={true}
          >
            <AddIcon width={52} stroke="#FFBB00" />
          </ButtonIcon>
        </Form>

        <Link
          href={`/fight?packages=${packages.join(
            ",",
          )}`} /*as={`/fight/${packages.join(",")}`}*/
        >
          <FightButton variant="primary" size="large" ripple={true}>
            Fight!
          </FightButton>
        </Link>
      </Container>
    </Layout>
  );
};

export default Index;

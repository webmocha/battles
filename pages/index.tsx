import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";

const Title = styled.h1`
  color: #333;
  font-size: 50px;
`;

const Index: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout title="Home | Battles.dev">
      <Title>Battles.dev</Title>
      <p>
        <Link href="/fight">
          <a>Fight!</a>
        </Link>
      </p>
    </Layout>
  );
};

export default Index;

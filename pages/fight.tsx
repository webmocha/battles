import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";

const Title = styled.h1`
  color: red;
  font-size: 50px;
`;

const Fight: React.FunctionComponent = (): JSX.Element => {
  return (
    <Layout title="Fight | Battles.dev">
      <Title>Fight! 💥</Title>
      <p>
        <Link href="/">
          <a>Back</a>
        </Link>
      </p>
    </Layout>
  );
};

export default Fight;

import * as React from "react";
import Link from "next/link";
import styled from "styled-components";
import Layout from "../components/Layout";
import { getFightData } from "../api/fights";
import { format, subDays } from "date-fns";

const Title = styled.h1`
  font-size: 7.5rem;
  font-family: ${(props) => props.theme.fonts.title};
`;

const Fight = (): JSX.Element => {
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

Fight.getInitialProps = async ({ req, res, query }) => {
  if (!req) {
    const { packages } = query;
    const twoDaysBefore = format(subDays(new Date(), 2), "YYYY-MM-DD");
    const oneDayBefore = format(subDays(new Date(), 1), "YYYY-MM-DD");
    const url = `/downloads/range/${twoDaysBefore}:${oneDayBefore}/${packages}`;
    const response = await fetch(
      `/api/npm/search/suggestions?text=${text}&size=10`,
    );
    const data: SearchResults = await response.json();
    return data;
  } else {
    return res.data;
  }
};
//  !req ? await getFightData() : res.data;

export default Fight;

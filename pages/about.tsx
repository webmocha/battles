import * as React from "react";
import styled from "../styles/styled-components";
import GithubIcon from "../components/icons/Github";
import Layout from "../components/Layout";
import Nav from "../components/Nav";
import Container from "../components/Container";
import Title from "../components/Title";

const Content = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;

  h2 {
    font-size: 2rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  ul {
    margin-left: 2rem;
  }
`;

const StyledGithubLink = styled.div`
  margin-top: 3rem;
  text-align: center;

  a:hover {
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  svg {
    fill: #fff;
    width: 3rem;
    transition: fill 0.2s;
  }
`;

const About = (): JSX.Element => {
  return (
    <Layout title="About | Battles.dev">
      <Nav links={[{ href: "/", title: "Back" }]} />
      <Container>
        <Title>About️</Title>
        <Content>
          <p>
            For every year of experience you{`'`}ve had in frontend development,
            no doubt you{`'`}ve read at least 2453#23@!&amp;2 articles espousing
            the merits of one framework over the other . If you{`'`}re in the
            middle of writing one of those articles, just throw your laptop in
            the trash now.
          </p>

          <p>
            We{`'`}ve combined years research with AR, VR, ER, xR, 4 cups of
            coffee, with some machine learning and a bag of chips to end these
            incessant debates once and for all.
          </p>

          <p>No more will you need to sheepily ask,</p>

          <blockquote>
            <p>Should I go with Ember or Angular for my new project?</p>
          </blockquote>

          <p>Just come on over - we{`'`}ve got you.</p>

          <p>
            <strong>
              Each day we{`'`}ll show you which framework reigns supreme over
              all the others.
            </strong>{" "}
            Q.E.D.
          </p>

          <hr />

          <p>
            If you{`'`}ve read this far, hopefully we don{`'`}t have to tell you
            - we{`'`}re kidding. While some of those versus articles have their
            merits - most are lame.
          </p>

          <p>
            What matters most is what is the best fit for your project and
            organization. Any developer worth their salt will tell you this.
          </p>

          <p>
            Beyond poking some fun at those versus articles, we built this app
            for some April Fool{`'`}s fun. Leveraging some tech that we are
            really excited about:
          </p>

          <ul>
            <li>
              <p>
                <a
                  href="https://nextjs.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Next.js
                </a>{" "}
                is pretty awesome! They released a new feature{" "}
                <code>target: serverless</code> which compiles next pages as
                single serving lambda handlers.
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://serverless.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Serverless deployment
                </a>{" "}
                - This app demonstrates the power of serverless deployment that
                comes in at <code>3.6mb</code> instead of the traditional{" "}
                <code>60mb</code> zip file that{`'`}s mostly node_modules.
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://reactjs.org/docs/hooks-intro.html"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  React Hooks
                </a>{" "}
                - Checking out the new hotness in React. They make it easier to
                work with state and produce reusable code, which provides better
                composition than mixins, HOCs, and render props.
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://storybook.js.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Storybook
                </a>{" "}
                - Used to build out components. This allowed us to mock the
                different states of the Bracket UI for quick testing and
                prototyping.
              </p>
            </li>
            <li>
              <p>
                <a
                  href="https://www.typescriptlang.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  TypeScript
                </a>{" "}
                - Type safety, static code analysis, better code suggestions,
                and most importantly helps us avoid typos.
              </p>
            </li>
          </ul>

          <hr />

          <h2>
            <strong>How it works:️</strong>
          </h2>

          <p>
            Winners are determined from data we get from NPM on package download
            count from yesterday and the day before. We calculate the percent
            change of download count and the package with the higher percent
            change wins.
          </p>

          <p>Essentially:</p>

          <ul>
            <li>
              <p>
                Package <code>A</code> was downloaded <code>525</code> times
                yesterday and <code>500</code> times the day before, that
                results in a <code>+5%</code> change.
              </p>
            </li>
            <li>
              <p>
                Package <code>B</code> was downloaded <code>1025</code> times
                yesterday and <code>1000</code> times the day before, that
                results in a <code>+2.5%</code> change.
              </p>
            </li>
          </ul>

          <p>
            Package <code>A</code> wins.
          </p>

          <StyledGithubLink>
            <a
              href="https://github.com/webmocha/battles"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon />
            </a>
          </StyledGithubLink>
        </Content>
      </Container>
    </Layout>
  );
};

export default About;

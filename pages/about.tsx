import * as React from "react";
import styled from "../styles/styled-components";
import GithubIcon from "../components/icons/Github";
import Layout from "../components/Layout";
import Container from "../components/Container";
import Title from "../components/Title";

const Content = styled.div`
  margin-top: 4rem;
  margin-bottom: 4rem;

  p {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
    line-height: 1.3;
  }

  strong {
    color: ${(props) => props.theme.colors.liteText};
  }

  blockquote {
    border-left: 0.3rem solid #454545;
    padding: 0.5rem 1rem;
    color: #717171;
    background: #151515;
    font-size: 1.5rem;
    font-style: italic;
    margin-bottom: 1.5rem;

    p {
      margin-bottom: 0;
    }
  }

  code {
    background-color: #151515;
    color: #bbb;
    border-radius: 3px;
    padding: 0 5px;
    font-size: 1.3rem;
  }

  hr {
    margin-top: 4rem;
    margin-bottom: 4rem;
    border: 0;
    border-top: 1px solid ${(props) => props.theme.colors.primary};
  }

  ul {
    margin-left: 2rem;
  }

  a {
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
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
      <Container>
        <Title>About️</Title>
        <Content>
          <p>
            For every year of experience you{`'`}ve had in frontend development,
            no doubt you{`'`}ve read at least 2453#23@!&amp;2 articles{" "}
            <strong>
              espousing the merits of one framework over the other
            </strong>
            . If you{`'`}re in the middle of writing one of those articles, just
            throw your laptop in the trash now.
          </p>

          <p>
            We{`'`}ve combined years research with AR, VR, ER, xR, 4 cups of
            coffee, with some machine learning and a bag of chips{" "}
            <strong>end these incessant debates once and for all</strong>.
          </p>

          <p>No more will you need to sheepily ask,</p>

          <blockquote>
            <p>Should I go with Ember or Angular for my new project?</p>
          </blockquote>

          <p>
            <strong>Just come on over - we{`'`}ve got you.</strong>
          </p>

          <p>
            Each day we{`'`}ll show you which framework reigns supreme over all
            the others. Q.E.D.
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
                <code>60mb</code> zip file that{`'`}s mostly node_modules
              </p>
            </li>
          </ul>

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

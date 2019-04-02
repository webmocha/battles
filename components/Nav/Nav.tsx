import * as React from "react";
import Link from "next/link";
import styled from "../../styles/styled-components";
import GithubIcon from "../icons/Github";

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  background: ${(props) => props.theme.colors.darkBackground};
  color: ${(props) => props.theme.colors.liteText};
`;

const StyledLink = styled.a`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  margin: 0 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const StyledGithubLink = styled.div`
  margin: 0 0.5rem;

  a:hover {
    svg {
      fill: ${(props) => props.theme.colors.primary};
    }
  }

  svg {
    fill: #fff;
    width: 1.4rem;
    margin-top: -0.2rem;
    transition: fill 0.2s;
  }
`;

interface Props {
  links?: { href: string; title: string }[];
}

const defaultLinks = [{ href: "/about", title: "About" }];

const Nav: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { links = defaultLinks } = props;
  return (
    <Wrapper>
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          <StyledLink>{link.title}</StyledLink>
        </Link>
      ))}
      <StyledGithubLink>
        <a
          href="https://github.com/webmocha/battles"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GithubIcon />
        </a>
      </StyledGithubLink>
    </Wrapper>
  );
};

export default Nav;

import * as React from "react";
import Link from "next/link";
import styled from "../../styles/styled-components";

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

  &:hover {
    text-decoration: underline;
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
    </Wrapper>
  );
};

export default Nav;

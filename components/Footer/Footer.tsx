import * as React from "react";
import styled from "../../styles/styled-components";

const Wrapper = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  padding: 1rem;
  text-align: center;
  background: ${(props) => props.theme.colors.darkBackground};
  color: ${(props) => props.theme.colors.liteText};

  p {
    font-size: 1rem;
    margin: 0;
  }
`;

const StyledLink = styled.a`
  font-weight: 600;
  color: ${(props) => props.theme.colors.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const Footer: React.FunctionComponent = (): JSX.Element => {
  return (
    <Wrapper>
      <p>
        Handcrafted by your friendly engineers at&nbsp;
        <StyledLink
          href="https://webmocha.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          WebMocha
        </StyledLink>
        , © 2019
      </p>
    </Wrapper>
  );
};

export default Footer;

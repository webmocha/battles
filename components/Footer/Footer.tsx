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
  z-index: 10;

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spacer {
    margin: 0 5px;
  }

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
      <div>
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
        <div className="spacer" />
        <StyledLink
          href="https://www.producthunt.com/posts/devbattles"
          target="_blank"
          rel="noopener noreferrer"
        >
          Show us some love on Product Hunt!
        </StyledLink>
      </div>
    </Wrapper>
  );
};

export default Footer;

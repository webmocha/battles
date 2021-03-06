import * as React from "react";
import styled, { css } from "../../styles/styled-components";

interface Props {
  name: string;
  description: string;
  isActive?: boolean;
}

const Wrapper = styled.div`
  ${(props: { isActive?: boolean }) => css`
    display: flex;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;

    ${props.isActive &&
      css`
        background: rgba(255, 255, 255, 0.1);
      `}
  `}
`;

const Content = styled.div`
  margin-left: 0.5rem;
`;

const Logo = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${(props) => props.theme.colors.border};
`;

const Title = styled.p`
  font-size: 1rem;
  margin: 0;
  color: #ccc;

  em {
    font-style: normal;
    font-weight: 700;
    color: ${(props) => props.theme.colors.white};
  }
`;

const Description = styled.p`
  font-size: 0.8rem;
  width: 18.75rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
`;

const Suggestion: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { name, description, isActive, ...restProps } = props;
  return (
    <Wrapper isActive={isActive} {...restProps}>
      <Logo />
      <Content>
        <Title dangerouslySetInnerHTML={{ __html: name }} />
        <Description>{description}</Description>
      </Content>
    </Wrapper>
  );
};

export default styled(Suggestion)``;

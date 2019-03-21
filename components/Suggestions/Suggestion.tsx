import * as React from "react";
import styled from "../../styles/styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  padding: 0.5rem;
`;

const Content = styled.div`
  margin-left: 0.5rem;
`;

const Logo = styled.div`
  width: 32px;
  height: 32px;
  background: ${(props) => props.theme.colors.border};
`;

const Title = styled.p`
  color: #ccc;

  em {
    font-style: normal;
    font-weight: 700;
    color: ${(props) => props.theme.colors.white};
  }
`;

const Description = styled.p`
  font-size: 0.8rem;
  width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

interface Props {
  name: string;
  description: string;
}

const Suggestion: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { name, description, ...restProps } = props;
  return (
    <Wrapper {...restProps}>
      <Logo />
      <Content>
        <Title dangerouslySetInnerHTML={{ __html: name }} />
        <Description>{description}</Description>
      </Content>
    </Wrapper>
  );
};

export default styled(Suggestion)``;

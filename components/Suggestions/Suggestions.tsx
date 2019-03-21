import * as React from "react";
import styled from "../../styles/styled-components";
import Suggestion from "./Suggestion";

const Wrapper = styled.div`
  max-width: 360px;
  border: 2px solid ${(props) => props.theme.colors.darkText};

  ${Suggestion}:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.darkText};
  }
`;

const Suggestions: React.FunctionComponent<{}> = (props): JSX.Element => {
  const {} = props;
  return (
    <Wrapper>
      <Suggestion
        name="react"
        description="React is a JavaScript library for building user interfaces"
      />
      <Suggestion
        name="<em>reac</em>t-redux"
        description="Official React bindings for Redux"
      />
    </Wrapper>
  );
};

export default Suggestions;

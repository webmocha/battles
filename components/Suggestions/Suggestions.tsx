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

interface SuggestionObject {
  package: {
    name: string;
    version: string;
    description: string;
  };
  highlight: string;
}

const Suggestions: React.FunctionComponent<{ data: SuggestionObject[] }> = (
  props,
): JSX.Element => {
  const { data } = props;
  return (
    <Wrapper>
      {data.map(({ package: { name, description }, highlight }) => (
        <Suggestion key={name} name={highlight} description={description} />
      ))}
    </Wrapper>
  );
};

export default Suggestions;

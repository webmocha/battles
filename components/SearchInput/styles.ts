import styled from "../../styles/styled-components";
import Suggestion from "./Suggestion";

export const SuggestionsWrapper = styled.div`
  position: relative;
  top: -1px;
  margin-top: -0.5rem;
  z-index: 999;
`;

export const Suggestions = styled.div`
  max-width: 22.5rem;
  border: 2px solid ${(props) => props.theme.colors.darkText};
  position: absolute;
  top: 0;
  left: 0;
  background: ${(props) => props.theme.colors.darkBackground};

  ${Suggestion}:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.darkText};
  }
`;

import styled from "../../styles/styled-components";

const Input = styled.input`
  min-width: 12.5rem;
  padding: 1rem;
  font-size: 1.25rem;
  background: transparent;
  font-family: ${(props) => props.theme.fonts.mono};
  color: ${(props) => props.theme.colors.liteText};
  border: 2px solid ${(props) => props.theme.colors.darkText};

  &:focus {
    outline: 2px solid ${(props) => props.theme.colors.blue};
  }
`;

export default Input as any;

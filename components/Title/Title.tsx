import styled from "../../styles/styled-components";
import { media } from "../../styles/utils/breakpoint";

const Title = styled.h1`
  display: flex;
  flex-direction: column;
  margin-top: 3rem;
  font-family: ${(props) => props.theme.fonts.title};
  font-size: 7.5rem;
  line-height: 1;
  text-align: center;
  color: ${(props) => props.theme.colors.primary};

  ${media.small`
    margin-top: 6rem;
  `}
`;

export default Title;

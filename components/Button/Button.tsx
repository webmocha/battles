import styled, { css } from "../../styles/styled-components";
import { colors } from "../../styles/theme";

interface Props {
  variant?: "primary" | "secondary";
  color?: keyof typeof colors;
}

const Button = styled.button<Props>`
  ${({ theme, variant = "secondary", color = "success" }) => css`
    padding: 0.8rem 1.4rem;
    border-radius: 0.25rem;
    border: 0;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;

    ${variant === "primary" &&
      css`
        color: ${theme.colors.white};
        background: ${theme.colors[color]};
      `}

    ${variant === "secondary" &&
      css`
        color: ${theme.colors[color]};
        border: 1px solid ${theme.colors[color]};
        background: transparent;
      `}

    &:hover {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
    }
  `}
`;

export default Button;

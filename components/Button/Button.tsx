import styled, { css, keyframes } from "../../styles/styled-components";
import { colors } from "../../styles/theme";

interface Props {
  variant?: "primary" | "secondary";
  size?: "large" | "medium";
  color?: keyof typeof colors;
}

const rippleOut = keyframes`
  100% {
    transform: scale(1.1, 1.3);
    opacity: 0;
  }
`;

const Button = styled.button<Props>`
  ${({
    theme,
    variant = "secondary",
    color = "primary",
    size = "medium",
  }) => css`
    position: relative;
    padding: 0.8rem 1.4rem;
    border: 0;
    font-size: 1rem;
    font-weight: 700;
    cursor: pointer;

    ${size === "large" &&
      css`
        padding: 1rem;
        font-size: 2rem;
        min-width: 250px;
        outline: 0;

        &:hover:before,
        &:focus:before {
          animation: ${rippleOut} 1s forwards;
        }
      `}

    ${variant === "primary" &&
      css`
        color: ${theme.colors.darkBackground};
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

    &:before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border: 1px solid ${theme.colors[color]}
    }
  `}
`;

export default Button;

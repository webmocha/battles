import styled, { css, keyframes } from "../../styles/styled-components";
import { colors } from "../../styles/theme";

interface Props {
  variant?: "primary" | "secondary";
  size?: "large" | "medium";
  color?: keyof typeof colors;
  ripple?: boolean;
}

const rippleOut = keyframes`
  100% {
    top: -14px;
    left: -14px;
    right: -14px;
    bottom: -14px;
    opacity: 0;
  }
`;

const Button = styled.button<Props>`
  ${({
    theme,
    variant = "secondary",
    color = "primary",
    size = "medium",
    ripple = false,
  }) => css`
    position: relative;
    padding: 0.8rem 1.4rem;
    border: 0;
    font-family: ${theme.fonts.base};
    font-size: 1rem;
    font-weight: 600;
    transition: opacity 0.25s;
    cursor: pointer;

    ${size === "large" &&
      css`
        padding: 1rem;
        font-size: 2rem;
        min-width: 250px;
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

    ${ripple &&
      css`
        will-change: top, left, right, bottom;
        outline: 0;

        &:before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 1px solid ${theme.colors[color]};
          pointer-events: none;
        }

        &:hover:before {
          animation: ${rippleOut} 1s forwards;
        }

        &:focus:before {
          animation: ${rippleOut} 1s infinite;
        }
      `}

    &:hover {
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.5);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;

      &:before {
        content: none;
      }
    }
  `}
`;

export default Button;

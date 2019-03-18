import { css } from "styled-components";
import { sizes } from "../theme";

export const media = Object.keys(sizes).reduce(
  (acc, label): { [key: string]: any } => {
    const accumulator: { [key: string]: any } = acc;
    const emSize = sizes[label] / 16;
    accumulator[label] = (...args: [any]) => css`
      @media (min-width: ${emSize}em) {
        ${css(...args)};
      }
    `;
    return accumulator;
  },
  {} as any,
);

export default {
  media,
};

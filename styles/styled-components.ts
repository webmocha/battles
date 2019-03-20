import baseStyled, { ThemedStyledInterface } from "styled-components";
import { StyledTheme } from "./theme";

const styled = baseStyled as ThemedStyledInterface<StyledTheme>;

// re-export everything
export * from "styled-components";

// set up theme interface on `styled`
export default styled;

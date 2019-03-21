import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import styled from "../../styles/styled-components";
import Suggestions from "./Suggestions";

const Wrapper = styled.div`
  background: ${(props) => props.theme.colors.darkBackground};
  padding: 2rem;
  width: 100%;
  height: 100vh;
`;

storiesOf("Input", module).add("Default", () => (
  <Wrapper>
    <Suggestions
      placeholder={text("placeholder", "placeholder")}
      onChange={action("onChange")}
    />
  </Wrapper>
));

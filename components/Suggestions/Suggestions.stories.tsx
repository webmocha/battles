import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import Suggestions from "./Suggestions";

storiesOf("Suggestions", module).add("Default", () => (
  <Suggestions
    placeholder={text("placeholder", "placeholder")}
    onChange={action("onChange")}
  />
));

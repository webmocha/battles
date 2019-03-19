import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text } from "@storybook/addon-knobs";
import Input from "./Input";

storiesOf("Input", module).add("Default", () => (
  <Input
    placeholder={text("placeholder", "placeholder")}
    onChange={action("onChange")}
  />
));

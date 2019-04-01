import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import DefaultLogo from "./DefaultLogo";

storiesOf("DefaultLogo", module).add("Default", () => (
  <DefaultLogo name={text("name", "abc")} />
));

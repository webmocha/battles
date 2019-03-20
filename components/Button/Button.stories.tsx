import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select } from "@storybook/addon-knobs";
import { colors } from "../../styles/theme";
import Button from "./Button";

storiesOf("Button", module).add("Default", () => (
  <Button
    variant={select("variant", ["primary", "secondary"], "primary")}
    onClick={action("Clicked")}
    color={select("color", Object.keys(colors), "success") as "success"}
  >
    {text("children", "Button")}
  </Button>
));

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { text, select } from "@storybook/addon-knobs";
import { colors } from "../../styles/theme";
import Button from "./Button";
import ButtonIcon from "./ButtonIcon";
import AddIcon from "../icons/Add";

storiesOf("Button", module)
  .add("Default", () => (
    <Button
      variant={select("variant", ["primary", "secondary"], "primary")}
      onClick={action("Clicked")}
      color={select("color", Object.keys(colors), "primary") as "primary"}
      size={select("size", ["medium", "large"], "medium")}
    >
      {text("children", "Button")}
    </Button>
  ))
  .add("Icon", () => (
    <ButtonIcon
      variant={select("variant", ["primary", "secondary"], "primary")}
      onClick={action("Clicked")}
      color={select("color", Object.keys(colors), "primary") as "primary"}
    >
      <AddIcon width={50} />
    </ButtonIcon>
  ));

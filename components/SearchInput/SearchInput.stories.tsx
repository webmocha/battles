import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import SearchInput from "./SearchInput";
import Suggestion from "./Suggestion";

storiesOf("SearchInput", module)
  .add("Default", () => <SearchInput />)
  .add("Suggestion", () => (
    <Suggestion
      name={text("name", "react")}
      description={text(
        "description",
        "React is a JavaScript library for building user interfaces",
      )}
      isActive={boolean("isActive", false)}
    />
  ));

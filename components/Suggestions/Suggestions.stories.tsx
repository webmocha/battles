import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text } from "@storybook/addon-knobs";
import Suggestions from "./Suggestions";
import Suggestion from "./Suggestion";
import mockData from "./mockData";

storiesOf("Suggestions", module)
  .add("Default", () => <Suggestions data={mockData.objects} />)
  .add("Suggestion", () => (
    <Suggestion
      name={text("name", "react")}
      description={text(
        "description",
        "React is a JavaScript library for building user interfaces",
      )}
    />
  ));

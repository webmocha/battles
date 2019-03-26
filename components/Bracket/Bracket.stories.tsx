import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import Bracket from "./Bracket";
import Contender from "./Contender";

storiesOf("Bracket", module)
  .add("Default", () => <Bracket>Hello</Bracket>)
  .add("Contender", () => (
    <Contender
      logo={text("logo", "https://api.adorable.io/avatars/285")}
      name={text("name", "Package Name")}
      dark={boolean("dark", false)}
    />
  ));

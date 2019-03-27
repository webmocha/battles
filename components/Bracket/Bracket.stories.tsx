import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import Bracket from "./Bracket";
import Contender from "./Contender";
import Match from "./Match";

storiesOf("Bracket", module)
  .add("Default", () => <Bracket>Hello</Bracket>)
  .add("Contender", () => (
    <Contender
      logo={text("logo", "https://api.adorable.io/avatars/285")}
      name={text("name", "Package Name")}
      dark={boolean("dark", false)}
    />
  ))
  .add("Match", () => (
    <svg width="200" height="300">
      <Match
        contenders={[
          {
            name: "Package 1",
            logo: "https://api.adorable.io/avatars/285",
          },
          {
            name: "Package 2",
            logo: "https://api.adorable.io/avatars/280",
          },
        ]}
      />
    </svg>
  ));

import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import Bracket from "./Bracket";
import Contender from "./Contender";
import Match from "./Match";
import Round from "./Round";

storiesOf("Bracket", module)
  .add("Default", () => <Bracket>Hello</Bracket>)
  .add("Round", () => (
    <Round
      matches={[
        ["react", "vue"],
        ["angular", "mithril"],
        // ["preact", "knockout"],
      ]}
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

storiesOf("Bracket/Contender", module)
  .add("Default", () => (
    <Contender
      logo={text("logo", "https://api.adorable.io/avatars/285")}
      name={text("name", "Package Name")}
      dark={boolean("dark", false)}
    />
  ))
  .add("Long Name", () => (
    <Contender
      logo={text("logo", "https://api.adorable.io/avatars/285")}
      name={text("name", "Extremely long package name")}
      dark={boolean("dark", false)}
    />
  ));

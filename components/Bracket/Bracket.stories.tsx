import * as React from "react";
import { storiesOf } from "@storybook/react";
import { text, boolean } from "@storybook/addon-knobs";
import { BracketConnected as Bracket } from "./Bracket";
import Contender from "./Contender";
import Match from "./Match";
import Round from "./Round";

const matchup2 = [[["A", "B"]], [["A"]]];
const matchup3 = [[["A", "B"], ["C"]], [["A", "C"]], [["C"]]];
const matchup4 = [[["A", "B"], ["C", "D"]], [["A", "C"]], [["C"]]];
const matchup6 = [
  [["A", "B"], ["C", "D"], ["E", "F"]],
  [["A", "C"], ["E"]],
  [["C", "E"]],
  [["E"]],
];
const matchup8 = [
  [["A", "B"], ["C", "D"], ["E", "F"], ["G", "H"]],
  [["A", "C"], ["E", "G"]],
  [["C", "G"]],
  [["G"]],
];

storiesOf("Bracket", module)
  .add("Default", () => (
    <Bracket matchup={matchup2} animate={boolean("animate", true)} />
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

storiesOf("Bracket/Brackets", module)
  .add("Versus 2", () => <Bracket matchup={matchup2} />)
  .add("Versus 3", () => <Bracket matchup={matchup3} />)
  .add("Versus 4", () => <Bracket matchup={matchup4} />)
  .add("Versus 6", () => <Bracket matchup={matchup6} />)
  .add("Versus 8", () => <Bracket matchup={matchup8} />);

storiesOf("Bracket/Round", module)
  .add("Default", () => (
    <Round
      height="850"
      matches={[
        ["react", "vue"],
        ["angular", "mithril"],
        ["preact", "knockout"],
      ]}
    />
  ))
  .add("Multi Round", () => (
    <svg width="620" height="600">
      <g>
        <Round
          height="600"
          x={0}
          matches={[["react", "vue"], ["angular", "mithril"]]}
        />
        <Round height="600" x={250} matches={[["vue", "angular"]]} />
        <Round height="600" x={500} matches={[["angular"]]} />
      </g>
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

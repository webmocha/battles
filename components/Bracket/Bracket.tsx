import * as React from "react";
import useBounds from "../hooks/useBounds";
import BracketStore, { BracketStoreContext } from "./Store";
import Round from "./Round";

const Bracket: React.FunctionComponent = (): JSX.Element => {
  const { state, dispatch } = React.useContext(BracketStoreContext);
  const [bracketBounds, bracketRef] = useBounds();
  const data = [
    [
      ["react", "vue"],
      ["angular", "mithril"],
      ["angular1", "mithril1"],
      ["angular2", "mithril2"],
    ],
    [["react", "vue"], ["angular", "mithril"]],
    [["vue", "angular"]],
    [["angular"]],
  ];

  React.useLayoutEffect(() => {
    dispatch({
      type: "SET_HEIGHT",
      height: bracketBounds.height > 0 ? bracketBounds.height : 250,
    });
  }, [bracketBounds.height]);

  return (
    <svg width={bracketBounds.width} height={state.height}>
      <g ref={bracketRef}>
        {data.map((matches, i) => (
          <Round
            height={state.height}
            key={i}
            x={i * 250}
            round={i}
            matches={matches}
          />
        ))}
      </g>
    </svg>
  );
};

const BracketConnected = (props: any): JSX.Element => {
  return (
    <BracketStore>
      <Bracket {...props} />
    </BracketStore>
  );
};

export default BracketConnected;

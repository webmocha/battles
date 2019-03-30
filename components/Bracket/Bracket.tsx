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
    <svg
      width={bracketBounds.width}
      height={state.height}
      viewBox={`0 0 ${bracketBounds.width} ${bracketBounds.height}`}
    >
      <g ref={bracketRef}>
        {data.map((matches, index) => {
          const prevRound = data[index - 1];
          const flattenPrevRound = flattenDeep(prevRound);
          if (flattenPrevRound.length % 2) {
            oddIndexRef.current = index;
          }
          const hasOddOffset =
            oddIndexRef.current > 0 && index >= oddIndexRef.current;

          return (
          <Round
            height={state.height}
              key={index}
              x={index * 250}
              round={index}
            rounds={data}
            matches={matches}
              oddOffset={hasOddOffset ? state.height / 11.3 : 0}
          />
          );
        })}
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

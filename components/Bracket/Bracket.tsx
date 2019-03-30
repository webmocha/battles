import * as React from "react";
import flattenDeep from "lodash/flattenDeep";
import useBounds from "../hooks/useBounds";
import BracketStore, { BracketStoreContext } from "./Store";
import Round from "./Round";

interface Props extends React.SVGProps<SVGSVGElement> {
  matchup: string[][][];
}

const Bracket: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { matchup } = props;
  const { state, dispatch } = React.useContext(BracketStoreContext);
  const [bracketBounds, bracketRef] = useBounds();
  const oddIndexRef = React.useRef(0);

  React.useEffect(() => {
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
        {matchup.map((matches, index) => {
          const prevRound = matchup[index - 1];
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
              rounds={matchup}
            matches={matches}
              oddOffset={hasOddOffset ? state.height / 11.3 : 0}
          />
          );
        })}
      </g>
    </svg>
  );
};

const BracketConnected: React.FunctionComponent<Props> = (
  props,
): JSX.Element => {
  return (
    <BracketStore>
      <Bracket {...props} />
    </BracketStore>
  );
};

export default BracketConnected;

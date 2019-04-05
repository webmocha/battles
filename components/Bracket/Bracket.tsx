import * as React from "react";
import flattenDeep from "lodash/flattenDeep";
import useTimeout from "../hooks/useTimeout";
import useBounds from "../hooks/useBounds";
import BracketStore, { BracketStoreContext } from "./Store";
import Round from "./Round";

interface Props extends React.SVGProps<SVGSVGElement> {
  matchup: string[][][];
  animate?: boolean;
}

const Bracket: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { state, dispatch } = React.useContext(BracketStoreContext);
  const { matchup, animate = state.animate } = props;
  const interactionReady = useTimeout(
    (matchup.length - 1) * 4250 + state.animationDelay,
  );
  const [bracketBounds, bracketRef] = useBounds();
  const oddIndexRef = React.useRef(0);

  React.useEffect(() => {
    dispatch({
      type: "SET_HEIGHT",
      // Helps Firefox render..
      height: bracketBounds.height > 0 ? bracketBounds.height : 300,
    });
  }, [bracketBounds.height]);

  React.useEffect(() => {
    dispatch({
      type: "SET_ANIMATE",
      animate: interactionReady ? false : animate,
    });
  }, [animate, interactionReady]);

  return (
    <svg
      width={bracketBounds.width}
      height={state.height}
      viewBox={`0 0 ${bracketBounds.width} ${bracketBounds.height}`}
      pointerEvents={interactionReady || !state.animate ? "auto" : "none"}
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
              height={bracketBounds.height}
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
      <defs>
        <filter
          id="glow"
          width={bracketBounds.width}
          height={state.height}
          filterUnits="userSpaceOnUse"
        >
          <feGaussianBlur result="coloredBlur" stdDeviation="2.5" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
  );
};

export const BracketConnected: React.FunctionComponent<Props> = (
  props,
): JSX.Element => {
  return (
    <BracketStore>
      <Bracket {...props} />
    </BracketStore>
  );
};

export default Bracket;

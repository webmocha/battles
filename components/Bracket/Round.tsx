import * as React from "react";
import flattenDeep from "lodash/flattenDeep";
import useBounds, { Bounds } from "../hooks/useBounds";
import { BracketStoreContext } from "./Store";
import Match from "./Match";
import { sumPreviousHeights } from "./utils";

interface Props extends React.SVGProps<SVGSVGElement> {
  matches: string[][];
  packages?: any;
  round?: number;
  rounds?: string[][][];
  oddOffset?: number;
}

const Round: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    matches,
    round = 0,
    rounds = [],
    oddOffset = 0,
    height,
    ...restProps
  } = props;
  const { state } = React.useContext(BracketStoreContext);
  const SVGHeight = Number(height) || state.height;
  const isFirstRound = round === 0;
  const [offsetY, setOffsetY] = React.useState(0);
  const margin = !isFirstRound
    ? SVGHeight / flattenDeep(matches).length - 88
    : 50; // 100
  const isFinals = rounds.length - 1 === round;
  const hasConnectors = Boolean(rounds.length) && !isFinals;

  const matchesBoundsRef: any = React.useRef([]);
  React.useEffect(() => {
    if (!isFirstRound) {
      const calculatedOffset = matchesBoundsRef.current.reduce(
        (acc: number, bounds: Bounds) => acc + bounds.height,
        (matchesBoundsRef.current.length - 1) * margin,
      );
      setOffsetY((SVGHeight - calculatedOffset) / 2 + oddOffset);
    }
  });

  return (
    <svg width={250} height={SVGHeight} {...restProps}>
      <g transform={`translate(0, ${offsetY})`}>
        {matches.map((match, index) => {
          const [matchBounds, matchRef] = useBounds();
          matchesBoundsRef.current[index] = matchBounds;
          const sumPreviousHeight = sumPreviousHeights(
            matchesBoundsRef.current,
            index,
            margin,
          );

          return (
            <Match
              key={index}
              ref={matchRef}
              contenders={match.map((contender) => ({
                // name: packages[contender.toLowerCase()].package,
                name: contender,
                logo: "https://api.adorable.io/avatars/285",
              }))}
              transform={`translate(0, ${sumPreviousHeight})`}
              margin={margin}
              height={matchBounds.height}
              hasConnectors={hasConnectors}
              round={round}
              nextRound={rounds[round + 1]}
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Round;

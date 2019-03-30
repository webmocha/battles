import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import { BracketStoreContext } from "./Store";
import Match from "./Match";

interface Props extends React.SVGProps<SVGSVGElement> {
  matches: string[][];
  packages?: any;
  round?: number;
}

const Round: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { matches, round = 0, height, ...restProps } = props;
  const { state } = React.useContext(BracketStoreContext);
  const SVGHeight = Number(height) || state.height;
  const [offsetY, setOffsetY] = React.useState(0);
  const margin = round ? SVGHeight / (matches.length * 2) - 88 : 50; // 100

  const matchesBoundsRef: any = React.useRef([]);

  React.useLayoutEffect(() => {
    if (round) {
      const calculatedOffset = matchesBoundsRef.current.reduce(
        (acc: number, bounds: Bounds) => acc + bounds.height,
        (matchesBoundsRef.current.length - 1) * margin,
      );
      setOffsetY((SVGHeight - calculatedOffset) / 2);
    }
  });

  return (
    <svg width={250} height={SVGHeight} {...restProps}>
      <g transform={`translate(0, ${offsetY})`}>
        {matches.map((match, index) => {
          const [matchBounds, matchRef] = useBounds();
          matchesBoundsRef.current[index] = matchBounds;
          // TODO: Move to utils
          const sumPreviousHeight = matchesBoundsRef.current
            .slice(0, index)
            .reduce(
              (acc: number, bounds: Bounds) => acc + bounds.height + margin,
              0,
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
            />
          );
        })}
      </g>
    </svg>
  );
};

export default Round;

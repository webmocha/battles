import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Match from "./Match";
import { packages as mockPackages } from "./mockData";

interface Props {
  matches: string[][];
  packages?: any;
}

const Round: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { matches, packages = mockPackages } = props;
  const minHeight = 250;
  const [height, setHeight] = React.useState(minHeight);

  const matchesBoundsRef: any = React.useRef([]);
  React.useLayoutEffect(() => {
    console.log("useLayoutEffect", matchesBoundsRef);
    // TODO: Move to utils
    const calculatedHeight = matchesBoundsRef.current.reduce(
      (acc: number, bounds: Bounds) => acc + bounds.height,
      (matchesBoundsRef.current.length - 1) * 100,
    );

    console.log("calculatedHeight", calculatedHeight);
    setHeight(calculatedHeight > 0 ? calculatedHeight : minHeight);
  });

  return (
    <svg height={height}>
      {matches.map((match, index) => {
        const [matchBounds, matchRef] = useBounds();
        matchesBoundsRef.current[index] = matchBounds;
        // TODO: Move to utils
        const sumPreviousHeight = matchesBoundsRef.current
          .slice(0, index)
          .reduce(
            (acc: number, bounds: Bounds) => acc + bounds.height + 100,
            0,
          );
        return (
          <Match
            key={index}
            forwardRef={matchRef}
            contenders={match.map((contender) => ({
              name: packages[contender.toLowerCase()].package,
              logo: "https://api.adorable.io/avatars/285",
            }))}
            transform={`translate(0, ${sumPreviousHeight})`}
          />
        );
      })}
    </svg>
  );
};

export default Round;

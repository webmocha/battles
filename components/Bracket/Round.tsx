import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Match from "./Match";
// import { packages as mockPackages } from "./mockData";

interface Props extends React.SVGProps<SVGSVGElement> {
  matches: string[][];
  packages?: any;
  round?: number;
}

const SVGHeight = 600;

const Round: React.FunctionComponent<Props> = (props): JSX.Element => {
  // const { matches, packages = mockPackages, ...restProps } = props;
  const { matches, round = 0, ...restProps } = props;
  const minHeight = 250;
  const [height, setHeight] = React.useState(minHeight);
  const [offsetY, setOffsetY] = React.useState(0);
  const margin = round ? SVGHeight / (matches.length * 2) - 100 : 50;

  const matchesBoundsRef: any = React.useRef([]);
  React.useLayoutEffect(() => {
    // TODO: Move to utils
    if (round === 0) {
      const calculatedHeight = matchesBoundsRef.current.reduce(
        (acc: number, bounds: Bounds) => acc + bounds.height,
        (matchesBoundsRef.current.length - 1) * 50,
      );
      setHeight(calculatedHeight > 0 ? calculatedHeight : minHeight);
    }

    const calculatedOffset = matchesBoundsRef.current.reduce(
      (acc: number, bounds: Bounds) => acc + bounds.height,
      (matchesBoundsRef.current.length - 1) * margin,
    );

    setOffsetY(round ? (SVGHeight - calculatedOffset) / 2 : 0);
  });

  console.log("height", height);

  return (
    <svg width={120} height={SVGHeight} {...restProps}>
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

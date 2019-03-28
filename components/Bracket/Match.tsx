import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";

interface Props {
  contenders: ContenderProps[];
  transform?: string;
}

const Match = React.forwardRef<SVGGElement, Props>(
  (props, ref): JSX.Element => {
    const { contenders, transform } = props;
    const contendersBoundsRef: React.RefObject<Bounds[]> = React.useRef([]);
    const margin = 50;

    return (
      <g ref={ref} transform={transform}>
        {contenders.map((contender, index) => {
          const [contenderBounds, contenderRef] = useBounds();
          contendersBoundsRef.current![index] = contenderBounds;
          // TODO: Move to utils
          const sumPreviousHeight = contendersBoundsRef
            .current!.slice(0, index)
            .reduce(
              (acc: number, bounds: Bounds) => acc + bounds.height + margin,
              0,
            );
          return (
            <Contender
              key={contender.name}
              ref={contenderRef}
              logo={contender.logo}
              name={contender.name}
              y={sumPreviousHeight}
            />
          );
        })}
      </g>
    );
  },
);

Match.displayName = "Match";

export default Match;

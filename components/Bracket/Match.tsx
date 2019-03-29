import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";

interface Props extends React.SVGProps<SVGGElement> {
  contenders: ContenderProps[];
  margin?: number;
}

const Match = React.forwardRef<SVGGElement, Props>(
  (props, ref): JSX.Element => {
    const { contenders, margin = 50, ...restProps } = props;
    const contendersBoundsRef: React.RefObject<Bounds[]> = React.useRef([]);

    return (
      <g ref={ref} {...restProps}>
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

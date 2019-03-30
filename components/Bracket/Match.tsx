import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";
import Connector from "./Connector";

interface Props extends React.SVGProps<SVGGElement> {
  contenders: ContenderProps[];
  margin?: number;
  hasConnnectors?: boolean;
}

const Match = React.forwardRef<SVGGElement, Props>(
  (props, ref): JSX.Element => {
    const {
      contenders,
      hasConnnectors,
      margin = 50,
      height,
      ...restProps
    } = props;
    const matchHeight = Number(height);
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
            <React.Fragment key={contender.name}>
              {hasConnnectors && (
                <Connector
                  index={index}
                  matchWidth={250}
                  matchHeight={matchHeight || 250}
                />
              )}
              <Contender
                ref={contenderRef}
                logo={contender.logo}
                name={contender.name}
                y={sumPreviousHeight}
              />
            </React.Fragment>
          );
        })}
      </g>
    );
  },
);

Match.displayName = "Match";

export default Match;

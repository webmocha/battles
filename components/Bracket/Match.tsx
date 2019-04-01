import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";
import Connector from "./Connector";
import { BracketStoreContext } from "./Store";

interface Props extends React.SVGProps<SVGGElement> {
  contenders: ContenderProps[];
  margin?: number;
  hasConnnectors?: boolean;
  round?: number;
}

const Match = React.forwardRef<SVGGElement, Props>(
  (props, ref): JSX.Element => {
    const {
      contenders,
      hasConnnectors,
      margin = 50,
      height,
      round = 0,
      ...restProps
    } = props;
    const { state } = React.useContext(BracketStoreContext);
    const matchHeight = Number(height);
    const contendersBoundsRef: React.RefObject<Bounds[]> = React.useRef([]);

    return (
      <g ref={ref} {...restProps}>
        {contenders.map((contender, index) => {
          const highlight = state.highlight === contender.name;
          const shouldDim = !highlight && state.highlight !== "";

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
                  round={round}
                  shouldDim={shouldDim}
                />
              )}
              <Contender
                ref={contenderRef}
                logo={contender.logo}
                name={contender.name}
                y={sumPreviousHeight}
                round={round}
                shouldDim={shouldDim}
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
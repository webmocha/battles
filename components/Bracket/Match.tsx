import * as React from "react";
import flattenDeep from "lodash/flattenDeep";
import useBounds, { Bounds } from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";
import Connector from "./Connector";
import { BracketStoreContext } from "./Store";

interface Props extends React.SVGProps<SVGGElement> {
  contenders: ContenderProps[];
  margin?: number;
  hasConnectors?: boolean;
  round?: number;
  nextRound?: string[][];
}

const Match = React.forwardRef<SVGGElement, Props>(
  (props, ref): JSX.Element => {
    const {
      contenders,
      hasConnectors,
      margin = 50,
      height,
      round = 0,
      nextRound,
      ...restProps
    } = props;
    const { state } = React.useContext(BracketStoreContext);
    const matchHeight = Number(height);
    const contendersBoundsRef: React.RefObject<Bounds[]> = React.useRef([]);
    const nextRoundContenders = flattenDeep(nextRound);

    return (
      <g ref={ref} {...restProps}>
        {contenders.map((contender, index) => {
          const highlight = state.highlight === contender.name;
          const shouldDim = !highlight && state.highlight !== "";
          const winner =
            nextRoundContenders.includes(contender.name) || !hasConnectors;

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
              {hasConnectors && (
                <Connector
                  index={index}
                  matchWidth={250}
                  matchHeight={matchHeight || 250}
                  round={round}
                  shouldDim={shouldDim || (state.highlight !== "" && !winner)}
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

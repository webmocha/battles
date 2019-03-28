import * as React from "react";
import useBounds, { Bounds } from "../hooks/useBounds";
import Contender, { Props as ContenderProps } from "./Contender";

interface Props {
  contenders: ContenderProps[];
  forwardRef?: any;
  transform?: string;
}

const Match: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { contenders, forwardRef, transform } = props;
  const contendersBoundsRef: React.RefObject<Bounds[]> = React.useRef([]);
  const margin = 50;

  return (
    <g ref={forwardRef} transform={transform}>
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
            forwardRef={contenderRef}
            logo={contender.logo}
            name={contender.name}
            y={sumPreviousHeight}
          />
        );
      })}
    </g>
  );
};

export default Match;

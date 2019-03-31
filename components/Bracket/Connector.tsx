import * as React from "react";
import { useSpring, animated } from "react-spring";
import styled from "../../styles/styled-components";
import delay from "../../utils/delay";
import { BracketStoreContext } from "./Store";

const Path = styled(animated.path)`
  fill: none;
  stroke: #ffbb00;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill-opacity: 0;
  filter: url(#glow);
`;

const BackPath = styled.path`
  fill: none;
  stroke: #252525;
  stroke-width: 1.5;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

interface Props extends React.SVGProps<SVGPathElement> {
  index: number;
  matchWidth: number;
  matchHeight: number;
  round?: number;
}

const Connector: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { index, matchWidth, matchHeight, round = 0 } = props;
  const { state } = React.useContext(BracketStoreContext);
  const animate = state.animate;
  const contenderWidth = 120;
  const contenderMiddle = 50;
  const horizontalLength = (matchWidth - contenderWidth) / 2;
  const verticalLength = matchHeight / 2 - contenderMiddle;
  const startY = index === 0 ? contenderMiddle : matchHeight - contenderMiddle;
  const horizontalPadding = 10;
  const pathEl: React.RefObject<SVGPathElement> = React.useRef(null);

  let totalLength: number | undefined = undefined;
  if (animate && pathEl.current) {
    totalLength = pathEl.current.getTotalLength();
  }

  const pathSpring: any = useSpring({
    from: { x: 0 },
    to: async (next: any) => {
      if (totalLength) {
        await delay(round * 4000);
        await next({ x: totalLength - 65 });
        await delay(500);
        await next({ x: totalLength });
      }
    },
    config: {
      duration: 500,
      easing: (t: number) => --t * t * t + 1,
    },
  });

  const pathDefinition = [
    `M ${contenderWidth - horizontalPadding} ${startY}`,
    `h ${horizontalLength + horizontalPadding}`,
    `v ${index === 0 ? "" : "-"}${verticalLength}`,
    `h ${horizontalLength}`,
  ].join(" ");

  return (
    <React.Fragment>
      <BackPath d={pathDefinition} />
      <Path
        d={pathDefinition}
        ref={pathEl}
        strokeDasharray={totalLength}
        strokeDashoffset={
          totalLength
            ? pathSpring.x.interpolate((x: number) => totalLength! - x)
            : undefined
        }
      />
      ;
    </React.Fragment>
  );
};

export default Connector;

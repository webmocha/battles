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
  transition: opacity 0.5s;
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
  shouldDim?: boolean;
}

const Connector: React.FunctionComponent<Props> = (props): JSX.Element => {
  const {
    index,
    matchWidth,
    matchHeight,
    round = 0,
    shouldDim = false,
  } = props;
  const { state } = React.useContext(BracketStoreContext);
  const animate = state.animate;
  const animationDelay = state.animationDelay;
  const contenderWidth = 120;
  const contenderMiddle = 50;
  const horizontalLength = (matchWidth - contenderWidth) / 2;
  const verticalLength = matchHeight / 2 - contenderMiddle;
  const startY = index === 0 ? contenderMiddle : matchHeight - contenderMiddle;
  const horizontalPadding = 10;
  const pathEl: React.RefObject<SVGPathElement> = React.useRef(null);
  const animatedRef = React.useRef(false);

  let totalLength: number | undefined = undefined;
  if (animate && pathEl.current && !animatedRef.current) {
    totalLength = pathEl.current.getTotalLength();
  }

  const pathSpring: any = useSpring({
    from: { x: 0 },
    to: async (next: any) => {
      if (totalLength) {
        await delay(animationDelay);
        await delay(round * 4000);
        await next({ x: totalLength - 65 });
        await delay(1000);
        await next({ x: totalLength });
        animatedRef.current = true;
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

  const boomSize = 75;
  const boomX = matchWidth - 65;
  const boomY = matchHeight / 2;

  const boomSpring: any = useSpring({
    from: {
      opacity: 0,
      fontSize: 0,
      x: boomX,
      y: boomY,
    },
    to: async (next: any) => {
      if (totalLength) {
        await delay(animationDelay);
        await next({
          fontSize: boomSize,
          x: boomX - boomSize / 2,
          y: boomY + boomSize / 2,
        });
        await delay(round * 4000 + 500);
        await next({
          opacity: 0.9,
          fontSize: boomSize,
          x: boomX - boomSize / 2,
          y: boomY + boomSize / 2,
        });
        await delay(250);
        await next({
          opacity: 0,
          fontSize: 0,
          x: boomX,
          y: boomY,
        });
      }
    },
    config: {
      duration: 200,
    },
  });

  return (
    <React.Fragment>
      <BackPath
        d={pathDefinition}
        style={{
          opacity: shouldDim ? 0 : undefined,
        }}
      />
      <Path
        d={pathDefinition}
        ref={pathEl}
        strokeDasharray={totalLength}
        strokeDashoffset={
          totalLength
            ? pathSpring.x.interpolate((x: number) => totalLength! - x)
            : undefined
        }
        style={{
          filter: shouldDim ? "none" : undefined,
          opacity: shouldDim ? 0.5 : undefined,
        }}
      />
      {animate && index === 1 && (
        <animated.text
          x={boomSpring.x}
          y={boomSpring.y}
          opacity={boomSpring.opacity}
          fontSize={boomSpring.fontSize}
        >
          💥
        </animated.text>
      )}
    </React.Fragment>
  );
};

export default Connector;

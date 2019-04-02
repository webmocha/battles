import * as React from "react";
import { useSpring, animated } from "react-spring";
import styled from "../../styles/styled-components";
import delay from "../../utils/delay";
import useBounds from "../hooks/useBounds";
import DefaultLogo from "../DefaultLogo";
import { BracketStoreContext } from "./Store";

export interface Props extends React.SVGProps<SVGSVGElement> {
  logo?: string;
  name: string;
  dark?: boolean;
  round?: number;
  shouldDim?: boolean;
}

const fontSize = 12;

const Name = styled.p`
  font-size: ${fontSize}px;
  text-align: center;
  color: #fff;
  margin: 0;
  line-height: normal;
`;

const Path = styled(animated.path)`
  fill: none;
  stroke: #ffbb00;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill-opacity: 0;
  filter: url(#glow);
`;

const BackPath = styled.path`
  fill: #1e1f20;
  stroke: #252525;
  stroke-width: 4;
  stroke-linecap: round;
  stroke-linejoin: round;
`;

const Contender = React.forwardRef<SVGSVGElement, Props>(
  (props, ref): JSX.Element => {
    const {
      logo,
      name,
      dark,
      round = 0,
      shouldDim = false,
      ...restProps
    } = props;
    const { state, dispatch } = React.useContext(BracketStoreContext);
    const animate = state.animate;
    const animationDelay = state.animationDelay;
    const [contentBounds, contentRef] = useBounds();
    const width = 120;
    const height = 100;
    const SVGHeight = height + contentBounds.height - fontSize;
    const contentOffset = height / 2 + 20;

    const onMouseEnter = (): void => {
      dispatch({ type: "SET_HIGHLIGHT", name });
    };

    const onMouseLeave = (): void => {
      dispatch({ type: "SET_HIGHLIGHT", name: "" });
    };

    const pathDefinition = [
      `M 0 ${SVGHeight / 2}`,
      `v -${SVGHeight / 2}`,
      `h 120`,
      `v ${SVGHeight}`,
      `h -120`,
      `v -${SVGHeight / 2}`,
    ].join(" ");

    const connectorAnimationDuration = 2000;

    const pathLength = width * 2 + SVGHeight * 2;
    const pathSpring: any = useSpring({
      from: { x: 0, opacity: 1 },
      to: async (next: any) => {
        await delay((round - 1) * 4000);
        await delay(connectorAnimationDuration + animationDelay);
        await next({ x: pathLength / 2 });
        await next({ opacity: 0 });
      },
      config: {
        duration: 750,
        easing: (t: number) => --t * t * t + 1,
      },
    });

    return (
      <svg
        width={width}
        height={SVGHeight}
        ref={ref}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        {...restProps}
      >
        <rect width={width} height={height} fill={dark ? "#333" : "#fff"} />
        <rect
          width={width}
          height={SVGHeight - contentOffset}
          y={contentOffset}
          fill="#333"
        />
        {logo ? (
          <image
            x="10"
            y="10"
            width={width - 20}
            height={height / 2}
            xlinkHref={logo}
          />
        ) : (
          <DefaultLogo x={(width - 50) / 2} y="10" name={name} />
        )}

        <foreignObject
          x="10"
          y={contentOffset + 10}
          width={width - 20}
          height={contentBounds.height}
        >
          <Name ref={contentRef}>{name}</Name>
        </foreignObject>
        {animate && round > 0 && (
          <animated.g opacity={pathSpring.opacity} pointerEvents="none">
            <BackPath d={pathDefinition} />
            <Path
              d={pathDefinition}
              strokeDasharray={pathLength}
              strokeDashoffset={pathSpring.x.interpolate(
                (x: number) => pathLength - x,
              )}
            />
            <Path
              d={pathDefinition}
              strokeDasharray={pathLength}
              strokeDashoffset={pathSpring.x.interpolate(
                (x: number) => pathLength + x,
              )}
            />
          </animated.g>
        )}
        {shouldDim && (
          <rect
            width={width}
            height={SVGHeight}
            fill="#151515"
            opacity={0.55}
            pointerEvents="none"
          />
        )}
      </svg>
    );
  },
);

Contender.displayName = "Contender";

export default Contender;

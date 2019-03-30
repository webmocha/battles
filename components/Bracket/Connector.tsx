import * as React from "react";
import styled from "../../styles/styled-components";

const Path = styled.path`
  fill: none;
  stroke: red;
  stroke-width: 1;
  stroke-linecap: round;
  stroke-linejoin: round;
  fill-opacity: 0;
  filter: url(#glow);
`;

interface Props extends React.SVGProps<SVGPathElement> {
  index: number;
  matchWidth: number;
  matchHeight: number;
}

const Connector: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { index, matchWidth, matchHeight } = props;
  const contenderWidth = 120;
  const contenderMiddle = 50;
  const horizontalLength = (matchWidth - contenderWidth) / 2;
  const verticalLength = matchHeight / 2 - contenderMiddle;
  const startY = index === 0 ? contenderMiddle : matchHeight - contenderMiddle;
  const horizontalPadding = 10;

  const pathDefinition = [
    `M ${contenderWidth - horizontalPadding} ${startY}`,
    `h ${horizontalLength + horizontalPadding}`,
    `v ${index === 0 ? "" : "-"}${verticalLength}`,
    index === 1 ? "" : `h ${horizontalLength}`,
  ].join(" ");

  return <Path d={pathDefinition} />;
};

export default Connector;

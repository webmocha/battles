import * as React from "react";
import styled from "../../styles/styled-components";

export interface Props {
  logo: string;
  name: string;
  dark?: boolean;
  y?: number;
}

const Name = styled.p`
  font-size: 0.75rem;
  text-align: center;
  color: #fff;
`;

const Contender: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { logo, name, dark, ...restProps } = props;
  const width = 120;
  const height = 100;
  const contentOffset = height / 2 + 20;

  return (
    <svg width={width} height={height} {...restProps}>
      <rect width={width} height={height} fill={dark ? "#333" : "#fff"} />
      <rect
        width={width}
        height={height - contentOffset}
        y={contentOffset}
        fill="#333"
      />
      <image
        x="10"
        y="10"
        width={width - 20}
        height={height / 2}
        xlinkHref={logo}
      />
      <foreignObject
        x="10"
        y={contentOffset + 10}
        width={width - 20}
        height="24"
      >
        <Name>{name}</Name>
      </foreignObject>
    </svg>
  );
};

export default Contender;

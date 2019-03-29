import * as React from "react";
import styled from "../../styles/styled-components";
import useBounds from "../hooks/useBounds";

export interface Props extends React.SVGProps<SVGSVGElement> {
  logo: string;
  name: string;
  dark?: boolean;
}

const fontSize = 12;

const Name = styled.p`
  font-size: ${fontSize}px;
  text-align: center;
  color: #fff;
`;

const Contender = React.forwardRef<SVGSVGElement, Props>(
  (props, ref): JSX.Element => {
    const { logo, name, dark, ...restProps } = props;
    const [contentBounds, contentRef] = useBounds();
    const width = 120;
    const height = 100;
    const contentOffset = height / 2 + 20;

    return (
      <svg
        width={width}
        height={height + contentBounds.height - fontSize}
        ref={ref}
        {...restProps}
      >
        <rect width={width} height={height} fill={dark ? "#333" : "#fff"} />
        <rect
          width={width}
          height={height + contentBounds.height - contentOffset - fontSize}
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
          height={contentBounds.height}
        >
          <Name ref={contentRef}>{name}</Name>
        </foreignObject>
      </svg>
    );
  },
);

Contender.displayName = "Contender";

export default Contender;

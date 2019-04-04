import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
  variant?: "increase" | "decrease";
}

const Arrow: React.FunctionComponent<Props> = ({
  fill,
  variant = "increase",
  ...restProps
}): JSX.Element => (
  <svg viewBox="0 0 15 15" {...restProps}>
    <title>Arrow</title>
    <g fill={fill || variant === "decrease" ? "#ff3f00" : "#2AD955"}>
      {variant === "decrease" ? (
        <path d="M 0,2 L 7.5,12 L 15,2 Z" />
      ) : (
        <path d="M 0,12 L 7.5,2 L 15,12 Z" />
      )}
    </g>
  </svg>
);

export default Arrow;

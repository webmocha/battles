import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  fill?: string;
}

const Download: React.FunctionComponent<Props> = ({
  fill,
  ...restProps
}): JSX.Element => (
  <svg viewBox="0 0 8 12" {...restProps}>
    <title>Download</title>
    <g fill={fill}>
      <polygon points="3 0, 5 0, 5 6, 8 6, 4 10, 0 6, 3 6" />
      <rect x="0" y="11" width="8" height="1" />
    </g>
  </svg>
);

export default Download;

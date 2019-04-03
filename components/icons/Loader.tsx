import * as React from "react";

interface Props {
  style?: {};
  fill?: string;
}

const Loader: React.FunctionComponent<Props> = ({
  fill = "#FFF",
  ...restProps
}): JSX.Element => (
  <svg width="32px" viewBox="0 0 33 30" {...restProps}>
    <rect x="0" width="3" height="14" fill={fill}>
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 16; 0 0"
        begin="0"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="10" y="0" width="3" height="14" fill={fill}>
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 16; 0 0"
        begin="0.25s"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="20" width="3" height="14" fill={fill}>
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 16; 0 0"
        begin="0.5s"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
    <rect x="30" width="3" height="14" fill={fill}>
      <animateTransform
        attributeType="xml"
        attributeName="transform"
        type="translate"
        values="0 0; 0 16; 0 0"
        begin="0.75s"
        dur="1s"
        repeatCount="indefinite"
      />
    </rect>
  </svg>
);

export default Loader;

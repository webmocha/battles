import * as React from "react";

export interface Props {
  width?: number;
  stroke?: string;
}

const AddIcon: React.FunctionComponent<Props> = ({
  stroke = "#000",
  ...restProps
}): JSX.Element => (
  <svg aria-label="Add" viewBox="0 0 24 24" {...restProps}>
    <path
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      d="M12,18 L12,6 M6,12 L18,12"
    />
  </svg>
);

export default AddIcon;

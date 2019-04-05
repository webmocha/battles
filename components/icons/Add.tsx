import * as React from "react";

interface Props extends React.SVGProps<SVGSVGElement> {
  width?: number;
  stroke?: string;
  title?: string;
}

const AddIcon: React.FunctionComponent<Props> = ({
  stroke = "#000",
  title = "Add",
  ...restProps
}): JSX.Element => (
  <svg aria-label="Add" viewBox="0 0 24 24" {...restProps}>
    <title>{title}</title>
    <path
      fill="none"
      stroke={stroke}
      strokeWidth="2"
      d="M12,18 L12,6 M6,12 L18,12"
    />
  </svg>
);

export default AddIcon;

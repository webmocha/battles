import * as React from "react";
import styled from "../../styles/styled-components";

interface Props extends React.SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
}

const Text = styled.p`
  color: ${(props) => props.theme.colors.primary};
  font-family: ${(props) => props.theme.fonts.title}, monospace;
  font-size: 65px;
  line-height: 50px;
  margin-top: 0.15rem;
  margin-left: 0.25rem;
`;

const DefaultLogo: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { name = "", size = 50, ...restProps } = props;
  let letter = name.charAt(0);
  if (letter === "@") {
    letter = name.charAt(1);
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...restProps}
    >
      <rect width={size} height={size} fill="#333" />
      <foreignObject width={size} height={size}>
        <Text>{letter}</Text>
      </foreignObject>
    </svg>
  );
};

export default DefaultLogo;

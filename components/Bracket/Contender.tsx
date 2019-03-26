import * as React from "react";
import styled from "../../styles/styled-components";

interface Props {
  logo: string;
  name: string;
  dark?: boolean;
}

const Name = styled.p`
  padding-left: 0.5rem;
  padding-right: 0.5rem;
  font-size: 0.75rem;
  text-align: center;
  color: #fff;
`;

const Contender: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { logo, name, dark } = props;
  const width = 120;
  const height = 100;

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill={dark ? "#333" : "#fff"} />
      <rect width={width} height={height} y={height / 2 + 20} fill="#333" />
      <image
        x="10"
        y="10"
        width={width - 20}
        height={height / 2}
        xlinkHref={logo}
      />
      <foreignObject
        x="10"
        y={height / 2 + 30}
        width={width - 20}
        height="100%"
      >
        <Name>{name}</Name>
      </foreignObject>
    </svg>
  );
};

export default Contender;

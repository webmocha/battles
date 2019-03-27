import * as React from "react";
import Contender, { Props as ContenderProps } from "./Contender";

interface Props {
  contenders: ContenderProps[];
}

const Match: React.FunctionComponent<Props> = (props): JSX.Element => {
  const { contenders } = props;

  return (
    <g>
      {contenders.map((contender, index) => (
        <Contender
          key={contender.name}
          logo={contender.logo}
          name={contender.name}
          y={index * 150}
        />
      ))}
    </g>
  );
};

export default Match;

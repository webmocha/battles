import * as React from "react";
import Downshift from "downshift";
import styled from "../../styles/styled-components";
import Input from "../Input";
import Suggestion from "./Suggestion";
import mockData from "./mockData";

const SuggestionsWrapper = styled.div`
  position: relative;
  top: -1px;
`;

const Suggestions = styled.div`
  max-width: 360px;
  border: 2px solid ${(props) => props.theme.colors.darkText};
  position: absolute;
  top: 0;
  left: 0;

  ${Suggestion}:not(:last-child) {
    border-bottom: 1px solid ${(props) => props.theme.colors.darkText};
  }
`;

const SearchInput: React.FunctionComponent<{}> = (props): JSX.Element => {
  const {} = props;
  const items = mockData.objects;

  return (
    <Downshift
      onChange={(selection) => alert(`You selected ${selection.package.name}`)}
      itemToString={(item) => (item ? item.package.name : "")}
    >
      {({
        getInputProps,
        getItemProps,
        getMenuProps,
        isOpen,
        highlightedIndex,
      }) => (
        <div>
          <Input
            {...getInputProps({
              isOpen,
              placeholder: "Search packages",
            })}
          />
          <SuggestionsWrapper>
            {isOpen ? (
              <Suggestions {...getMenuProps()}>
                {items.map((item, index) => (
                  <Suggestion
                    key={item.package.name}
                    {...getItemProps({
                      item,
                      index,
                    })}
                    name={item.highlight}
                    description={item.package.description}
                    isActive={highlightedIndex === index}
                  />
                ))}
              </Suggestions>
            ) : null}
          </SuggestionsWrapper>
        </div>
      )}
    </Downshift>
  );
};

export default SearchInput;

import * as React from "react";
import debounce from "lodash/debounce";
import Downshift from "downshift";
import styled from "../../styles/styled-components";
import Input from "../Input";
import Suggestion from "./Suggestion";

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
  const [items, setItems] = React.useState([]);
  const {} = props;

  const fetchSearchSuggestions = debounce(async (text): Promise<void> => {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.npmjs.org/search/suggestions?text=${text}&size=10`,
    );
    const data: any = await response.json();
    if (data.objects) {
      setItems(data.objects);
    }
  }, 200);

  return (
    <Downshift
      onChange={(selection) =>
        console.log(`You selected ${selection.package.name}`)
      }
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
              onChange: (event: any) => {
                const value = event.target.value;
                fetchSearchSuggestions(value);
              },
            })}
          />
          <SuggestionsWrapper>
            {isOpen ? (
              <Suggestions {...getMenuProps()}>
                {items &&
                  items.map((item: any, index) => (
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

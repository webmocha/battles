import * as React from "react";
import Downshift from "downshift";
import styled from "../../styles/styled-components";
import { media } from "../../styles/utils/breakpoint";
import Input from "../Input";
import Suggestion from "./Suggestion";
import { SuggestionsWrapper, Suggestions } from "./styles";
import { fetchSearchSuggestions, SearchResultObject } from "./api";

interface Props {
  addPackages?: any;
  index?: number;
}

const Wrapper = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  margin-top: 0.5rem;

  ${media.small`
    width: 15rem;
  `}

  input {
    width: 100%;
  }
`;

const SearchInput: React.FunctionComponent<Props> = (props): JSX.Element => {
  const [items, setItems] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const { addPackages = () => {}, index = 0 } = props;

  return (
    <Wrapper>
      <Downshift
        onChange={(selection) => addPackages(selection, index)}
        selectedItem={inputValue}
        onStateChange={(changes) => {
          if (changes.hasOwnProperty("selectedItem")) {
            setInputValue(changes.selectedItem);
          } else if (changes.hasOwnProperty("inputValue")) {
            const value = changes.inputValue || "";
            setInputValue(value);
            addPackages(value, index);
          }
        }}
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
                "aria-label": `Search Input ${index}`,
                onChange: (event: React.FormEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value;
                  setItems([]);
                  fetchSearchSuggestions({ text: value, setItems });
                },
                onBlur: (event: React.FormEvent<HTMLInputElement>) => {
                  const value = event.currentTarget.value;
                  addPackages(value, index);
                },
              })}
            />
            <SuggestionsWrapper>
              {isOpen && inputValue ? (
                <Suggestions {...getMenuProps()}>
                  {items && items.length > 0 ? (
                    items.map((item: SearchResultObject, index) => (
                      <Suggestion
                        key={item.package.name}
                        {...getItemProps({
                          item: item.package.name,
                          index,
                        })}
                        name={item.highlight}
                        description={item.package.description}
                        isActive={highlightedIndex === index}
                      />
                    ))
                  ) : (
                    <p
                      style={{
                        width: "22.25rem",
                        padding: "0.7rem 0.5rem",
                        margin: 0,
                        fontSize: "1rem",
                      }}
                    >
                      ...
                    </p>
                  )}
                </Suggestions>
              ) : null}
            </SuggestionsWrapper>
          </div>
        )}
      </Downshift>
    </Wrapper>
  );
};

export default SearchInput;

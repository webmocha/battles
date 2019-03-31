import debounce from "lodash/debounce";

export interface SearchResultObject {
  package: {
    name: string;
    version: string;
    description: string;
  };
  highlight: string;
}

export interface SearchResults {
  objects: SearchResultObject[];
}

export const fetchSearchSuggestions = debounce(
  async ({ text, setItems }): Promise<void> => {
    const response = await fetch(
      `/api/npm/search/suggestions?text=${text}&size=10`,
    );
    const data: SearchResults = await response.json();
    if (data.objects) {
      setItems(data.objects);
    }
  },
  200,
);

import { PackageEntry, DownloadsResponse } from "../../api/fight";

interface Details extends PackageEntry {
  start: string;
  end: string;
}

interface State {
  height: number;
  highlight: string;
  animate: boolean;
  animationDelay: number;
  details: Details[] | null;
  packages: DownloadsResponse;
  // animationDuration: number;
}

export const initialState: State = {
  height: 0,
  highlight: "",
  animate: false,
  animationDelay: 2500,
  details: null,
  packages: {},
  // animationDuration: 0,
};

export type Action =
  | { type: "SET_HEIGHT"; height: number }
  | { type: "SET_ANIMATE"; animate: boolean }
  | { type: "SET_HIGHLIGHT"; name: string }
  | { type: "SET_DETAILS"; details: Details[] | null }
  | { type: "SET_PACKAGES"; packages: DownloadsResponse };

function bracketReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_HEIGHT":
      return { ...state, height: action.height };
    case "SET_ANIMATE":
      return { ...state, animate: action.animate };
    case "SET_HIGHLIGHT":
      return { ...state, highlight: action.name };
    case "SET_DETAILS":
      return { ...state, details: action.details };
    case "SET_PACKAGES":
      return { ...state, packages: action.packages };
    default:
      throw new Error();
  }
}

export default bracketReducer;

import { PackageEntry, DownloadsResponse } from "../../api/fight";

interface State {
  height: number;
  highlight: string;
  animate: boolean;
  animationDelay: number;
  details: PackageEntry[] | null;
  packages: DownloadsResponse | null;
  // animationDuration: number;
}

export const initialState: State = {
  height: 0,
  highlight: "",
  animate: false,
  animationDelay: 2500,
  details: null,
  packages: null,
  // animationDuration: 0,
};

export type Action =
  | { type: "SET_HEIGHT"; height: number }
  | { type: "SET_ANIMATE"; animate: boolean }
  | { type: "SET_HIGHLIGHT"; name: string }
  | { type: "SET_DETAILS"; match: string[] }
  | { type: "UNSET_DETAILS" }
  | { type: "SET_PACKAGES"; packages: DownloadsResponse }
  | { type: "RESET_BRACKET" };

function bracketReducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_HEIGHT":
      return { ...state, height: action.height };
    case "SET_ANIMATE":
      return { ...state, animate: action.animate };
    case "SET_HIGHLIGHT":
      return { ...state, highlight: action.name };
    case "SET_DETAILS":
      const details =
        state.packages !== null
          ? action.match.reduce(
              (acc, p) => [...acc, state.packages![p]],
              [] as PackageEntry[],
            )
          : null;
      return { ...state, details };
    case "UNSET_DETAILS":
      return { ...state, details: null };
    case "SET_PACKAGES":
      return { ...state, packages: action.packages };
    case "RESET_BRACKET":
      return initialState;
    default:
      throw new Error();
  }
}

export default bracketReducer;

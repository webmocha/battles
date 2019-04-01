interface State {
  // width: number;
  height: number;
  packages: {};
  matches: [];
  highlight: string;
  animate: boolean;
}

export const initialState: State = {
  // width: 0,
  height: 0,
  packages: {},
  matches: [],
  highlight: "",
  animate: true,
};

export type Action =
  // | { type: "SET_WIDTH"; width: number }
  | { type: "SET_HEIGHT"; height: number }
  | { type: "SET_ANIMATE"; animate: boolean }
  | { type: "SET_HIGHLIGHT"; name: string }
  | { type: "LOAD_PACKAGES"; packages: {} };

function bracketReducer(state: State, action: Action): State {
  switch (action.type) {
    // case "SET_WIDTH":
    //   return { ...state, width: action.width };
    case "SET_HEIGHT":
      return { ...state, height: action.height };
    case "SET_ANIMATE":
      return { ...state, animate: action.animate };
    case "SET_HIGHLIGHT":
      return { ...state, highlight: action.name };
    default:
      throw new Error();
  }
}

export default bracketReducer;

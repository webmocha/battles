interface State {
  // width: number;
  height: number;
  packages: {};
  matches: [];
  highlight: string;
}

export const initialState: State = {
  // width: 0,
  height: 0,
  packages: {},
  matches: [],
  highlight: "",
};

export type Action =
  // | { type: "SET_WIDTH"; width: number }
  | { type: "SET_HEIGHT"; height: number }
  | { type: "LOAD_PACKAGES"; packages: {} };

function bracketReducer(state: State, action: Action): State {
  switch (action.type) {
    // case "SET_WIDTH":
    //   return { ...state, width: action.width };
    case "SET_HEIGHT":
      return { ...state, height: action.height };
    default:
      throw new Error();
  }
}

export default bracketReducer;

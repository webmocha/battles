interface State {
  height: number;
  highlight: string;
  animate: boolean;
  animationDelay: number;
  // animationDuration: number;
}

export const initialState: State = {
  height: 0,
  highlight: "",
  animate: false,
  animationDelay: 2000,
  // animationDuration: 0,
};

export type Action =
  | { type: "SET_HEIGHT"; height: number }
  | { type: "SET_ANIMATE"; animate: boolean }
  | { type: "SET_HIGHLIGHT"; name: string };

function bracketReducer(state: State, action: Action): State {
  switch (action.type) {
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

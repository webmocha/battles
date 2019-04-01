import * as React from "react";
import reducer, { initialState, Action } from "./reducer";

export const BracketStoreContext = React.createContext({
  state: initialState,
  dispatch: (() => {}) as React.Dispatch<Action>,
});

const BracketStore: React.FunctionComponent<{}> = (props): JSX.Element => {
  const { children } = props;
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <BracketStoreContext.Provider value={{ state, dispatch }}>
      {children}
    </BracketStoreContext.Provider>
  );
};

export default BracketStore;

//external imports
import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

//internal imports
//import Reducer from "./Reducer.js";

//Global variable for context Api
const INITIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isFetching: false,
  error: false,
};

//create context
export const Context = createContext(INITIAL_STATE);

// user reducer for multiple state handle
export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

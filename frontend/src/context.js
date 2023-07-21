import React, { createContext, useReducer } from "react";
// 1. create context instance 
export const Context = createContext();

// 2. initialstate
const initialState = {
    auth: false, // indicates if the current user is authenticated or not.
    user: null, // stores the current user data, which we defined in the backend.
    token: null, // field is the acquired token after a successful login
  };

  // 3. reducer to make updates based on the actions 
  const reducer = (state, action) => {
    // Check the action type
    switch (action.type) {
      case "LOGIN":
      // In case of login action
        return {
          ...state,
          isAuthenticated: true,
          user: action.payload.user,
          token: action.payload.token,
        };
      case "LOGOUT":
      // In case of logout action
        return {
          ...state,
          isAuthenticated: false,
          user: null,
        };
      default:
        return state;
    }
  };

  // 4. create the context provider so that all the children components of the application can access the state easily.
  const ContextProvider = ({ children }) => {
    // dispatch is a function that allows the state updates to be triggered
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
      <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
    );
  };
  
  export default ContextProvider;
import React, {useEffect, useContext} from "react";
import { Context } from "./context";
import Navbar from "./components/Navbar";
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from "./pages/Signup"
import Confirmation from "./pages/Confirmation";
import Login from "./pages/Login";
import Home from "./pages/Home";

const RequireAuth = ({ children }) => {
  const { state } = useContext(Context);
  return state.auth ? children : <Navigate to="/login" replace />;
};

const OnlyNotAuth = ({ children }) => {
  const { state } = useContext(Context);
  return !state.auth ? children : <Navigate to="/" replace />;
};

const App = () => {
  localStorage.clear()
  const { dispatch } = useContext(Context);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("educativeUser"));
    if (user)
      dispatch({
        type: "LOGIN",
        payload: {
          user: user,
          token: user?.token,
        },
      });
  }, []);
  return (
    <>
      <Navbar auth={false} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          }
        />

        <Route
          path="/signup"
          element={
            <OnlyNotAuth>
              <Signup />
            </OnlyNotAuth>
          }
        />
        <Route
          path="/login"
          element={
            <OnlyNotAuth>
              <Login />
            </OnlyNotAuth>
          }
        />
        <Route
          path="/verify/:confirmationToken"
          element={
            <OnlyNotAuth>
              <Confirmation />
            </OnlyNotAuth>
          }
        />
      </Routes>
    </>
  );
};

export default App;

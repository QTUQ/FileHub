import React, { useState, useContext } from "react";
import { Context } from "../context";
import Alert from "./Alert";
import Loader from "./Loader";
import AuthService from "../services/auth.service";

const LoginForm = () => {
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");

  const { dispatch } = useContext(Context);

  const [processing, setProcessing] = useState(false);
  const [alertState, setAlertState] = useState({
    show: false,
    color: "green",
    msg: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    AuthService.login({ emailOrUsername, password })
      .then((res) => {
        console.log(res);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        dispatch({
          type: "LOGIN",
          payload: {
            user: res.data,
            token: res.data.token,
          },
        });
        setProcessing(false);
      })
      .catch((err) => {
        console.log(err);
        setProcessing(false);
        setAlertState({
          show: true,
          color: "red",
          msg:  "Failed to process the data", // err.response.data ||
        });
      });
  };

  return (
    <div className="max-w-md mx-auto p-8">
    <form onSubmit={handleSubmit}>
    <div className="flex justify-center">
        {alertState.show ? (
          <Alert
            color={alertState.color}
            msg={alertState.msg}
            showAlert={alertState.show}
            setShowAlert={(value) =>
              setAlertState({ ...alertState, show: value })
            }
          />
        ) : null}
      </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input 
            id="email-address"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="border py-2 px-3 w-full rounded"
            placeholder="Email address or Username"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            className="border py-2 px-3 w-full rounded"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Login
      </button>
       <div className="flex justify-center">
        {processing ? <Loader /> : null}
      </div>
      </form>
    </div>
  );
};

export default LoginForm;

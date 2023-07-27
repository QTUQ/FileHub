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
            id="email"
            type="email"
            className="border py-2 px-3 w-full rounded"
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
            className="border py-2 px-3 w-full rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
        <button
        type="submit"
        className="mt-8 py-2 px-4 rounded block mx-auto text-white font-bold bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600"
      >
        Login
      </button>
        {processing ? <Loader /> : null}
      </form>
    </div>
  );
};

export default LoginForm;

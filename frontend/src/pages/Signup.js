import React from "react";
import SignupForm from "../components/SignupForm";
import logo from "../assets/logo.png";

const Signup = () => {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 bg-white ">
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-lg  shadow-lg rounded-7xl">
          <div className="max-w-md w-full space-y-8">
            <div>
            <div className="flex justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-20 h-20 text-cyan-500"
              viewBox="0 0 24 24" 
              fill="none"
              stroke="currentColor"
              >
                <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            </div>
              <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Create a new account
              </h2>
            </div>
            <SignupForm />
          </div>
        </div>
        </div>
    );
  };
  
  export default Signup;
  
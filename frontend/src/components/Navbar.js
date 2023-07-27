import React, { useState, useContext } from "react";
import { Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import { Context } from "../context";

const Actions = ({ auth, customStyle }) => {
  return (
    <>
      {auth ? (
        <button type="button" className={customStyle}>
          Logout
        </button>
      ) : (
        <>
          <Link to="/login" className={customStyle}>
            Login
          </Link>
          <Link to="/signup" className={customStyle}>
            Signup
          </Link>
        </>
      )}
    </>
  );
};

const Navbar = ({ auth }) => {
  const { state } = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <nav className="bg-[#2063b0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg"
                 className="w-8 h-8 text-cyan-500" 
                 viewBox="0 0 24 24"
                 fill="none"
                 stroke="currentColor"
              >
                 <path d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              </div>
              <h1 className="text-white font-semibold text-2xl">  
                 FileHub
              </h1>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link
                    to="/"
                    className=" hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Home
                  </Link>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <Actions
                auth={state.auth}
                customStyle="hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium"
              />
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-gray-900 inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {!isOpen ? (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                ) : (
                  <svg
                    className="block h-6 w-6"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>

        <Transition
          show={isOpen}
          enter="transition ease-out duration-100 transform"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="transition ease-in duration-75 transform"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          {(ref) => (
            <div className="md:hidden" id="mobile-menu">
              <div ref={ref} className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                <Link
                  to="/"
                  className="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                >
                  Home
                </Link>
                <Actions
                  auth={state.auth}
                  customStyle="hover:bg-gray-700 text-white block px-3 py-2 rounded-md text-base font-medium"
                />
              </div>
            </div>
          )}
        </Transition>
      </nav>
    </div>
  );
};

export default Navbar;

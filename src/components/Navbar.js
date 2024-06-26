import React from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Navbar() {
  const navigate = useNavigate();

  const loggedin = localStorage.getItem("loggedIn");

  const handleLogout = () => {
    navigate('/productlist')
    localStorage.removeItem("loggedIn");
  };

  const handleClick = () => {
    if (loggedin == null) {
      toast.error("user is not logged in");
    } else {
      navigate("/viewcart");
    }
  };

  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <a href="/productlist" className="btn btn-ghost text-xl">Ecommerce</a>
        </div>
        <div className="flex-none">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
            </div>
            <div
              tabIndex={0}
              className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
            >
              <div className="card-body">
                <div className="card-actions">
                  <button
                    onClick={handleClick}
                    className="btn btn-primary btn-block"
                  >
                    View cart
                  </button>
                </div>
              </div>
            </div>
          </div>

          {loggedin !== null ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div className="w-10 rounded-full">
                  <img alt="Tailwind CSS Navbar component" src="" />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <a>
                  <button onClick={handleLogout}>Logout</button>
                </a>
              </ul>
            </div>
          ) : (
            <a href="/signup" className="btn btn-ghost text-xl">
              Sign up
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
